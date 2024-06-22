/**
 * Get the value of the specified environment variable if permitted.
 *
 * If permissions is not yet granted do not ask for it and do not access the environment.
 *
 * If permission is not granted or the environment variable is not defined, `undefined` is returned.
 *
 * @param envVar the environment variable name to access.
 */
export async function getEnvVarIfPermitted(
  envVar: string,
): Promise<string | undefined> {
  const permissionDescriptor = { name: "env", path: envVar } as const;
  const status = await Deno.permissions.query(permissionDescriptor);

  if (status.state !== "granted") {
    return undefined;
  }
  return Deno.env.get(envVar);
}
