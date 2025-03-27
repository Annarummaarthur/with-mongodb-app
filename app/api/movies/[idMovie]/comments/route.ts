import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: any): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');

    const { idMovie } = params;
    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }

    const comments = await db.collection('comments').find({ movie_id: new ObjectId(idMovie) }).toArray();

    if (!comments.length) {
      return NextResponse.json({ status: 404, message: 'No comments found', error: 'No comments found for the given movie ID' });
    }

    return NextResponse.json({ status: 200, data: { comments } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}
