const DISCORD_ID = "749287774703714497";

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface DiscordUser {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
}

export interface CustomStatus {
  text: string | null;
  emoji_name: string | null;
  emoji_id: string | null;
}

export interface LanyardSpotify {
  song: string;
  artist: string;
  album: string;
  album_art_url: string | null;
  track_id: string;
  timestamps: { start: number; end: number } | null;
}

export interface VSCodeActivity {
  details: string;
  elapsed_start: number | null;
}

export interface LanyardData {
  discord_user: DiscordUser;
  discord_status: DiscordStatus;
  custom_status: CustomStatus | null;
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
  vscode: VSCodeActivity | null;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseResponse(raw: any): LanyardData {
  const d = raw.data;
  const user = d.discord_user;

  const avatar_url = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=64`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;

  const customActivity = d.activities?.find((a: { type: number }) => a.type === 4);
  const custom_status: CustomStatus | null = customActivity
    ? {
        text: customActivity.state ?? null,
        emoji_name: customActivity.emoji?.name ?? null,
        emoji_id: customActivity.emoji?.id ?? null,
      }
    : null;

  const vsActivity = d.activities?.find(
    (a: { type: number; name: string }) => a.type === 0 && a.name === "Code",
  );
  const vscode: VSCodeActivity | null = vsActivity
    ? {
        details: vsActivity.details ?? "Editing",
        elapsed_start: vsActivity.timestamps?.start ?? null,
      }
    : null;

  const rawSpotify = d.spotify;
  const spotify: LanyardSpotify | null = d.listening_to_spotify && rawSpotify
    ? {
        song: rawSpotify.song,
        artist: rawSpotify.artist,
        album: rawSpotify.album,
        album_art_url: rawSpotify.album_art_url ?? null,
        track_id: rawSpotify.track_id,
        timestamps: rawSpotify.timestamps ?? null,
      }
    : null;

  return {
    discord_user: {
      id: user.id,
      username: user.username,
      display_name: user.display_name ?? user.global_name ?? user.username,
      avatar_url,
    },
    discord_status: d.discord_status,
    custom_status,
    listening_to_spotify: d.listening_to_spotify,
    spotify,
    vscode,
    active_on_discord_web: d.active_on_discord_web,
    active_on_discord_desktop: d.active_on_discord_desktop,
    active_on_discord_mobile: d.active_on_discord_mobile,
  };
}

export async function fetchLanyard(): Promise<LanyardData> {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Lanyard fetch failed");
  return parseResponse(await res.json());
}
