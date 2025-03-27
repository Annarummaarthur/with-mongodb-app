// page/api/movies/[idMovie]/comments/[idComment]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: any): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie, idComment } = params;
    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {
      return NextResponse.json({ status: 400, message: 'Invalid ID format', error: 'ID format is incorrect' });
    }
    
    const comment = await db.collection('comments').findOne({
      _id: new ObjectId(idComment),
      movie_id: new ObjectId(idMovie),
    });
    
    if (!comment) {
      return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment found with the given IDs' });
    }
    
    return NextResponse.json({ status: 200, data: { comment } });
  } catch (error: any) {
    console.log('Error fetching comment:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

export async function POST(request: Request, { params }: any): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idMovie } = params;

    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID' });
    }

    const body = await request.json();
    const newComment = {
      ...body,
      movie_id: new ObjectId(idMovie),
      date: new Date(),
    };

    const result = await db.collection('comments').insertOne(newComment);

    return NextResponse.json({ status: 201, data: { comment: newComment, insertedId: result.insertedId } });
  } catch (error: any) {
    console.log('Error creating comment:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

export async function PUT(request: Request, { params }: any): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idMovie, idComment } = params;

    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {
      return NextResponse.json({ status: 400, message: 'Invalid ID format' });
    }

    const body = await request.json();
    const updateResult = await db.collection('comments').updateOne(
      { _id: new ObjectId(idComment), movie_id: new ObjectId(idMovie) },
      { $set: body }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Comment not found' });
    }

    return NextResponse.json({ status: 200, message: 'Comment updated successfully' });
  } catch (error: any) {
    console.log('Error updating comment:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

export async function DELETE(request: Request, { params }: any): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idMovie, idComment } = params;

    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {
      return NextResponse.json({ status: 400, message: 'Invalid ID format' });
    }

    const deleteResult = await db.collection('comments').deleteOne({
      _id: new ObjectId(idComment),
      movie_id: new ObjectId(idMovie),
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Comment not found' });
    }

    return NextResponse.json({ status: 200, message: 'Comment deleted successfully' });
  } catch (error: any) {
    console.log('Error deleting comment:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}
