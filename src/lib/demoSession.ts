/**
 * Signed, stateless session tokens for demo/offline auth mode.
 * Works in both Edge Runtime (proxy.ts) and Node.js.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64url(bytes: Uint8Array): string {
  let str = "";
  for (const b of bytes) {
    str += String.fromCharCode(b);
  }

  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(input: string): Uint8Array {
  const padded =
    input.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (input.length % 4)) % 4);

  const binary = atob(padded);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign", "verify"]
  );
}

/**
 * Create signed session token
 */
export async function signDemoSession(
  payload: Record<string, unknown>,
  secret: string
): Promise<string> {
  const body = base64url(
    encoder.encode(JSON.stringify(payload))
  );

  const key = await getHmacKey(secret);

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(body)
  );

  return `${body}.${base64url(new Uint8Array(signature))}`;
}

/**
 * Verify signed session token
 */
export async function verifyDemoSession(
  token: string,
  secret: string
): Promise<Record<string, unknown> | null> {
  try {
    const [body, signature] = token.split(".");

    if (!body || !signature) {
      return null;
    }

    const key = await getHmacKey(secret);

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64urlDecode(signature) as BufferSource,
      encoder.encode(body) as BufferSource
    );

    if (!valid) {
      return null;
    }

    const payload = JSON.parse(
      decoder.decode(base64urlDecode(body))
    ) as Record<string, unknown>;

    if (
      typeof payload.exp === "number" &&
      Date.now() > payload.exp
    ) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("verifyDemoSession error:", error);
    return null;
  }
}