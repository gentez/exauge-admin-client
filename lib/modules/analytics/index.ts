import { endOfDay, startOfDay, subDays,format } from "date-fns";
import { prisma } from "lib/clients/prisma";

export async function getAnalyticsByClientId(email: string): Promise<any> {
  try {
    // Step 1: Get client user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const clientId = String(user.user_id);

    // Step 2: Fetch all exams by client_id
    const exams = await prisma.exam.findMany({
      where: { client_id: clientId },
    });

    if (!exams.length) return { cards: [], table: [] };

    // Step 3: Group exams by user_id
    const userMap = new Map();

    exams.forEach((exam) => {
      const existing = userMap.get(exam.user_id) || {
        user_id: exam.user_id,
        totalExams: 0,
        correctAnswers: 0,
        attempts: 0,
      };

      existing.totalExams += 1;
      existing.attempts += exam.attempt ? 1 : 0;
      if (exam.result === "correct") {
        existing.correctAnswers += 1;
      }

      userMap.set(exam.user_id, existing);
    });

    const usersData = Array.from(userMap.values());

    // Step 4: Calculate cards
    const totalExams = exams.length;
    const totalAttempts = exams.filter((e) => e.attempt).length;
    const totalUsers = usersData.length;
    const totalCorrect = usersData.reduce((acc, u) => acc + u.correctAnswers, 0);

    const avgSuccessRate = ((totalCorrect / totalExams) * 100).toFixed(1) + "%";

    const cards = {
      totalUsers,
      totalExams,
      totalAttempts,
      avgSuccessRate,
    };

    // Step 5: Build table
    const table = exams.map((exam) => ({
      exam_id: exam.exam_id,
      exam_guid: exam.exam_guid,
      client_id: exam.client_id,
      exam: exam.exam,
      answer: exam.answer,
      result: exam.result,
      attempt: exam.attempt,
      user_id: exam.user_id,
      created_at: exam.created_at,
      options: exam.options,
    }));

    return { cards, table };
  } catch (error) {
    console.error("Failed to get analytics from database", error);
    throw error;
  }
}


export async function getExamAnalyticsByClientId(email: string): Promise<
  { date: string; exams: number }[]
> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    // Set range: past 8 days
    const daysBack = 8;
    const end = endOfDay(new Date());
    const start = startOfDay(subDays(end, daysBack));

    // Fetch exams for the client within the date range
    const exams = await prisma.exam.findMany({
      where: {
        client_id: String(user?.user_id),
        created_at: {
          gte: start,
          lte: end,
        },
      },
      select: {
        created_at: true,
      },
    });

    // Group and count exams per day
    const dateMap: Record<string, number> = {};

    for (let i = 0; i <= daysBack; i++) {
      const date = format(subDays(end, daysBack - i), "yyyy-MM-dd");
      dateMap[date] = 0; // initialize
    }

    exams.forEach(({ created_at }) => {
      const date = format(created_at, "yyyy-MM-dd");
      if (dateMap[date] !== undefined) {
        dateMap[date]++;
      }
    });

    // Convert to array
    const chartData = Object.entries(dateMap).map(([date, exams]) => ({
      date,
      exams,
    }));

    return chartData;
  } catch (error) {
    console.error("Error generating exam analytics:", error);
    throw new Error("Failed to generate analytics");
  }
}