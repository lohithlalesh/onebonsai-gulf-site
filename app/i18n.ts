import "server-only";

import { cookies } from "next/headers";
import { isLocale, localeCookie, type Locale } from "./locale";

export async function getRequestLocale(): Promise<Locale> {
  const value = (await cookies()).get(localeCookie)?.value;
  return isLocale(value) ? value : "en";
}
