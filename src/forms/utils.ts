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

export function Form() {
  const preverb = {
    label: "preverb",
  };
  
  const person1 = {
    label: "person1",
  };
  
  const version = {
    label: "version",
  };
  
  const root = {
    label: "root",
  };
  
  const thema = {
    label: "thema",
  };
  
  const person2 = {
    label: "person2",
  };
  
  return {
    get preverb() {
      return preverb;
    },
    set preverb(value) {
      validatePreverb(value);
      preverb.value = value;
      preverb.isException = false;
      preverb.note = null;
    },
    set preverbExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validatePreverb(value);
        validateNote(note);
        preverb.value = value;
        preverb.isException = true;
        preverb.note = note;
      }
    },
    get person1() {
      return person1;
    },
    set person1(value) {
      validatePerson(value);
      person1.value = value;
      person1.isException = false;
      person1.note = null;
    },
    set person1Exc(patch) {
      if (patch) {
        const { value, note } = patch;
        validatePerson(value);
        person1.value = value;
        person1.isException = true;
        person1.note = note;
      }
    },
    get version() {
      return version;
    },
    set version(value) {
      validateVersion(value);
      version.valueRaw = value;
      version.value = select_version(value);
      version.isException = false;
      version.note = null;
    },
    set versionExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validateVersion(value);
        validateNote(note);
        version.valueRaw = value;
        version.value = select_version(value);
        version.isException = true;
        version.note = note;
      }
    },
    get root() {
      return root;
    },
    set root(value) {
      validateRoot(value);
      root.value = value;
      root.isException = false;
      root.note = null;
    },
    set rootExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validateRoot(value);
        validateNote(note);
        root.value = value;
        root.isException = true;
        root.note = note;
      }
    },
    get thema() {
      return thema;
    },
    set thema(value) {
      validateThema(value);
      thema.value = value;
      thema.isException = false;
      thema.note = null;
    },
    set themaExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validateThema(value);
        validateNote(note);
        thema.value = value;
        thema.isException = true;
        thema.note = note;
      }
    },
    get person2() {
      return person2;
    },
    set person2(value) {
      validatePerson(value);
      person2.value = value;
      person2.isException = false;
      person2.note = null;
    },
    set person2Exc(patch) {
      if (patch) {
        const { value, note } = patch;
        validatePerson(value);
        person2.value = value;
        person2.isException = true;
        person2.note = note;
      }
    },
    get stemValue() {
      return [version.value, root.value, thema.value].filter(Boolean).join("");
    },
  };
}

function validatePreverb(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("preverb must be a string or null");
  }
  
  if (!PREVERB.some(p => p == value)) {
    throw new Error(`preverb must be one of '${PREVERB.join("', '")}'`);
  }
}

function validateVersion(value) {
  if (typeof value != "string") {
    throw new Error("version must be a string");
  }
  
  if (!VERSION.some(v => v == value)) {
    throw new Error(`version must be one of '${VERSION.join("', '")}'`);
  }
}

function validateRoot(value) {
  if (typeof value != "string") {
    throw new Error("root must be a string");
  }
  
  if (value == "") {
    throw new Error("root must not be empty");
  }
}

function validateThema(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("thema must be a string or null");
  }
  
  if (!THEMA.some(t => t == value)) {
    throw new Error(`thema must be one of '${THEMA.join("', '")}'`);
  }
}

function validatePerson(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("person must be a string or null");
  }
  
  if (value === "") {
    throw new Error("person must not be empty");
  }
}

function validateNote(value) {
  if (typeof value != "string") {
    throw new Error("note must be a string");
  }
  
  if (value == "") {
    throw new Error("note must not be empty");
  }
}
