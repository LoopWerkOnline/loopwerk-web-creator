/** Onzichtbaar veld tegen spambots. Mensen zien het niet; bots vullen het vaak wel in. */
export function HoneypotField({ name = "website" }: { name?: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name={name} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
