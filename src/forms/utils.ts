const PREVERB = [null, "მი", "მო", "მიმო", "წა", "წამო", "შე", "შემო", "გა", "გამო", "ა", "ამო", "ჩა", "ჩამო", "და", "გადა", "გადმო"];

const VERSION = ["NEUTRAL1", "NEUTRAL2", "SUBJECTIVE", "OBJECTIVE", "SUPERESSIVE"];

const THEMA = [null, "ი", "ავ", "ამ", "ებ", "ობ"];

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
// beware: assumes args to constructor and set are validated!
export function Form(args) {
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
      preverb.value = value;
      preverb.isException = true;
      preverb.note = note;
    },
    get person1() {
      return person1;
    },
    set person1({ value, note }) {
      person1.value = value;
      person1.isException = true;
      person1.note = note;
    },
    get version() {
      return version;
    },
    set version({ value, note }) {
      version.valueRaw = value;
      version.value = select_version(value);
      version.isException = true;
      version.note = note;
    },
    get root() {
      return root;
    },
    set root({ value, note }) {
      root.value = value;
      root.isException = true;
      root.note = note;
    },
    get thema() {
      return thema;
    },
    set thema({ value, note }) {
      thema.value = value;
      thema.isException = true;
      thema.note = note;
    },
    get person2() {
      return person2;
    },
    set person2({ value, note }) {
      person2.value = value;
      person2.isException = true;
      person2.note = note;
    },
  };
}

export function validateArgs({ preverb, version, root, thema }) {
  validatePreverb(preverb);
  validateVersion(version);
  validateRoot(root);
  validateThema(thema);
}

export function validateExceptions({ preverb, version, root, thema } = {}) {
  if (preverb) {
    validatePreverb(preverb.value);
    validateNote(preverb.note);
  }
  
  if (version) {
    validateVersion(version.value);
    validateNote(version.note);
  }
  
  if (root) {
    validateRoot(root.value);
    validateNote(root.note);
  }
  
  if (thema) {
    validateThema(thema.value);
    validateNote(thema.note);
  }
}


export function validatePreverb(preverb) {
  if (typeof preverb != "string" && preverb !== null) {
    throw new Error("preverb must be a string or null");
  }
  
  if (!PREVERB.some(p => p == preverb)) {
    throw new Error(`preverb must be one of '${PREVERB.join("', '")}'`);
  }
}

export function validateVersion(version) {
  if (typeof version != "string") {
    throw new Error("version must be a string");
  }
  
  if (!VERSION.some(v => v == version)) {
    throw new Error(`version must be one of '${VERSION.join("', '")}'`);
  }
}

export function validateRoot(root) {
  if (typeof root != "string") {
    throw new Error("root must be a string");
  }
  
  if (!root) {
    throw new Error("root must not be empty");
  }
}

export function validateThema(thema) {
  if (typeof thema != "string" && thema !== null) {
    throw new Error("thema must be a string or null");
  }
  
  if (!THEMA.some(t => t == thema)) {
    throw new Error(`thema must be one of '${THEMA.join("', '")}'`);
  }
}

export function validateNote(note) {
  if (typeof note != "string") {
    throw new Error("note must be a string");
  }
  
  if (!note) {
    throw new Error("note must not be empty");
  }
}
