import { createClient } from '@libsql/client';

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoUrl || !tursoAuthToken) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Turso credentials not found. View counter will be disabled.');
  }
}

let tursoClient: ReturnType<typeof createClient> | null = null;

function getTursoClient() {
  if (!tursoUrl || !tursoAuthToken) {
    return null;
  }

  if (!tursoClient) {
    try {
      tursoClient = createClient({
        url: tursoUrl,
        authToken: tursoAuthToken,
        // Vercel Edge Runtime 최적화
        syncUrl: process.env.TURSO_SYNC_URL || undefined,
      });
    } catch (error) {
      // 프로덕션 환경에서는 에러 로그를 남기지 않음
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to create Turso client:', error);
      }
      return null;
    }
  }

  return tursoClient;
}

/**
 * Turso 연결 상태 확인
 */
export async function checkTursoConnection(): Promise<boolean> {
  const client = getTursoClient();
  if (!client) {
    return false;
  }

  try {
    await client.execute('SELECT 1');
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Turso connection check failed:', error);
    }
    return false;
  }
}

export async function getViews(slug: string): Promise<number> {
  const client = getTursoClient();
  if (!client) {
    return 0;
  }

  if (!slug || typeof slug !== 'string' || slug.length > 100) {
    return 0;
  }

  try {
    const result = await client.execute({
      sql: 'SELECT views FROM page_views WHERE slug = ?',
      args: [slug],
    });

    if (result.rows.length === 0) {
      return 0;
    }

    const views = result.rows[0].views;
    return typeof views === 'number' ? views : 0;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching views:', error);
    }
    return 0;
  }
}

export async function getTotalViewsStats(): Promise<{
  totalViews: number;
  totalPages: number;
}> {
  const client = getTursoClient();
  if (!client) {
    return { totalViews: 0, totalPages: 0 };
  }

  try {
    const result = await client.execute({
      sql: 'SELECT COUNT(*) as pages, COALESCE(SUM(views), 0) as total FROM page_views',
      args: [],
    });

    if (result.rows.length === 0) {
      return { totalViews: 0, totalPages: 0 };
    }

    const row = result.rows[0] as { pages?: number; total?: number };
    const totalPages =
      typeof row.pages === 'number' ? row.pages : parseInt(String(row.pages || 0), 10) || 0;
    const totalViews =
      typeof row.total === 'number' ? row.total : parseInt(String(row.total || 0), 10) || 0;

    return { totalViews, totalPages };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching total views stats:', error);
    }
    return { totalViews: 0, totalPages: 0 };
  }
}

export async function getTopViewedPages(
  limit = 5
): Promise<Array<{ slug: string; views: number }>> {
  const client = getTursoClient();
  if (!client) {
    return [];
  }

  try {
    const result = await client.execute({
      sql: 'SELECT slug, views FROM page_views ORDER BY views DESC LIMIT ?',
      args: [limit],
    });

    return result.rows.map((row: any) => ({
      slug: String(row.slug),
      views: typeof row.views === 'number' ? row.views : parseInt(String(row.views || 0), 10) || 0,
    }));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching top viewed pages:', error);
    }
    return [];
  }
}

export async function incrementViews(slug: string): Promise<number> {
  const client = getTursoClient();
  if (!client) {
    return 0;
  }

  if (!slug || typeof slug !== 'string' || slug.length > 100) {
    return 0;
  }

  try {
    await client.execute({
      sql: `
        INSERT INTO page_views (slug, views, updated_at) 
        VALUES (?, 1, CURRENT_TIMESTAMP)
        ON CONFLICT(slug) DO UPDATE SET views = views + 1, updated_at = CURRENT_TIMESTAMP
      `,
      args: [slug],
    });

    return await getViews(slug);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error incrementing views:', error);
    }
    return 0;
  }
}


