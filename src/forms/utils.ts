// todo: add remaining versions
export function select_version({ version }) {

  return version == "NEUTRAL1"
    ? null
    : version == "NEUTRAL2"
    ? "ა"
    : version == "SUBJECTIVE"
    ? "ი"
    : (() => { throw new Error(`Invalid version "${version}"`) })();
}

export function error(msg) {
  throw new Error(msg);
}