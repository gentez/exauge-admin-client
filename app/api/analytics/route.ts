import { auth } from '@/app/(auth)/auth';
import { getAnalyticsByClientId } from '@/lib/modules/analytics';
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({
        success: false,
        message: 'Unauthorized',
    }, { status: 401 });
  }
  try {
    const email = session.user.email;
    if (!email) {
        return Response.json({
            success: false,
            message: 'Invalid email',
        }, { status: 400 });
    }

    const chats = await getAnalyticsByClientId(email);

    return Response.json({
        success: true,
        data: chats,
    }, { status: 200});
  } catch (_) {
    return Response.json({
        success: false,
        message: 'Internal server error',
    }, { status: 500 });
  }
}