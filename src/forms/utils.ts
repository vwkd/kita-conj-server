// todo: add remaining versions
export function select_version(version) {

  return version == "NEUTRAL1"
    ? null
    : version == "NEUTRAL2"
    ? "ა"
    : version == "SUBJECTIVE"
    ? "ი"
    : error(`Invalid version "${version}"`);
}

export function error(msg) {
  throw new Error(msg);
}

// args is { preverb, person1, version, root, thema, person2 }
export function Form(args) {
  validateArgs(args);
  
  const preverb = {
    label: "preverb",
    value: args.preverb,
    isException: false,
    note: null,
  };
  
  const person1 = {
    label: "person1",
    value: args.person1,
    isException: false,
    note: null,
  };
  
  const version = {
    label: "version",
    valueRaw: args.version,
    value: select_version(args.version),
    isException: false,
    note: null,
  };
  
  const root = {
    label: "root",
    value: args.root,
    isException: false,
    note: null,
  };
  
  const thema = {
    label: "thema",
    value: args.thema,
    isException: false,
    note: null,
  };
  
  const person2 = {
    label: "person2",
    value: args.person2,
    isException: false,
    note: null,
  };
  
  return {
    get preverb() {
      return preverb;
    },
    set preverb({ value, note }) {
      validateUpdate(value, note);
      
      preverb.value = value;
      preverb.isException = true;
      preverb.note = note;
    },
    get person1() {
      return person1;
    },
    set person1({ value, note }) {
      validateUpdate(value, note);
      
      person1.value = value;
      person1.isException = true;
      person1.note = note;
    },
    get version() {
      return version;
    },
    set version({ value, note }) {
      validateUpdate(value, note);
      
      version.valueRaw = value;
      version.value = select_version(value);
      version.isException = true;
      version.note = note;
    },
    get root() {
      return root;
    },
    set root({ value, note }) {
      validateUpdate(value, note);
      
      root.value = value;
      root.isException = true;
      root.note = note;
    },
    get thema() {
      return thema;
    },
    set thema({ value, note }) {
      validateUpdate(value, note);
      
      thema.value = value;
      thema.isException = true;
      thema.note = note;
    },
    get person2() {
      return person2;
    },
    set person2({ value, note }) {
      validateUpdate(value, note);
      
      person2.value = value;
      person2.isException = true;
      person2.note = note;
    },
  };
}

// todo: arg is non-empty string or null, except root is never null
// args is { preverb, version, root, thema }
function validateArgs(args) {
}

// todo: value is non-empty string or null, except root is never null, note is non-empty string
function validateUpdate(value, note) {
}

function validateValue(value) {
}