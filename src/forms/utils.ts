import { log } from "../deps.ts";

const PERSON = ["S1", "S2", "S3", "P1", "P2", "P3"];

const OBJ = ["DIRECT", "INDIRECT"];

const PREVERB = [null, "მი", "მო", "მიმო", "წა", "წამო", "შე", "შემო", "გა", "გამო", "ა", "ამო", "ჩა", "ჩამო", "და", "გადა", "გადმო"];

const VERSION = ["NEUTRAL1", "NEUTRAL2", "SUBJECTIVE", "OBJECTIVE", "SUPERESSIVE"];

const THEMA = [null, "ი", "ავ", "ამ", "ებ", "ობ"];

const MODUS = [null, "დ"];

export const VOWELS = ["ა", "ე", "ი", "ო", "უ"];

export const T_SOUNDS = ["დ", "თ", "ტ", "ძ", "ც", "წ", "ჯ", "ჩ", "ჭ"];

export const SOFT_SOUNDS = ["ბ", "ფ", "ზ", "ს", "ჟ", "შ", "ღ", "ხ", "ლ", "რ", "მ", "ნ", "ვ"];

export function select_version(version, person_o) {
  return version == "NEUTRAL1"
    ? null
    : version == "NEUTRAL2"
    ? "ა"
    : version == "SUBJECTIVE"
    ? "ი"
    : version == "OBJECTIVE"
    ? person_o.slice(-1) == "3"
      ? "უ"
      : "ი"
    : version == "SUPERESSIVE"
    ? "ა"
    : error(`Invalid version "${version}"`);
}

export function error(msg) {
  throw new Error(msg);
}

export function Form(person_s, person_o, obj) {
  log.debug("Creating form:", person_s, person_o, obj);
  
  validateArgPerson(person_s);
  validateArgPerson(person_o);
  validateArgObject(obj);

  const preverb = {
  };
  
  const person1 = {
  };
  
  const version = {
  };
  
  const root = {
  };
  
  const thema = {
  };
  
  const modus = {
  };
  
  const person2 = {
  };
  
  return {
    get preverb() {
      return preverb;
    },
    set preverb(value) {
      validatePreverb(value);
      preverb.value = value;
      preverb.note = undefined;
    },
    set preverbExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validatePreverb(value);
        validateNote(note);
        preverb.value = value;
        preverb.note = note;
      }
    },
    get person1() {
      return person1;
    },
    set person1(value) {
      validatePerson(value);
      person1.value = value;
      person1.note = undefined;
    },
    set person1Exc(patch) {
      if (patch) {
        const { value, note } = patch;
        validatePerson(value);
        person1.value = value;
        person1.note = note;
      }
    },
    get version() {
      return version;
    },
    set version(value) {
      validateVersion(value, obj);
      version.valueRaw = value;
      version.value = select_version(value, person_o);
      version.note = undefined;
    },
    set versionExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validateVersion(value, obj);
        validateNote(note);
        version.valueRaw = value;
        version.value = select_version(value, person_o);
        version.note = note;
      }
    },
    get root() {
      return root;
    },
    set root(value) {
      validateRoot(value);
      root.value = value;
      root.note = undefined;
    },
    set rootExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validateRoot(value);
        validateNote(note);
        root.value = value;
        root.note = note;
      }
    },
    get thema() {
      return thema;
    },
    set thema(value) {
      validateThema(value);
      thema.value = value;
      thema.note = undefined;
    },
    set themaExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validateThema(value);
        validateNote(note);
        thema.value = value;
        thema.note = note;
      }
    },
    get modus() {
      return modus;
    },
    set modus(value) {
      validateModus(value);
      modus.value = value;
      modus.note = undefined;
    },
    set modusExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validateModus(value);
        validateNote(note);
        modus.value = value;
        modus.note = note;
      }
    },
    get person2() {
      return person2;
    },
    set person2(value) {
      validatePerson(value);
      person2.value = value;
      person2.note = undefined;
    },
    set person2Exc(patch) {
      if (patch) {
        const { value, note } = patch;
        validatePerson(value);
        person2.value = value;
        person2.note = note;
      }
    },
    get stemValue() {
      return [version.value, root.value, thema.value, modus.value].filter(Boolean).join("");
    },
  };
}

function validateArgPerson(value) {
  if (typeof value != "string") {
    throw new Error("person must be a string");
  }
  
  if (!PERSON.some(v => v == value)) {
    throw new Error(`person must be one of '${PERSON.join("', '")}'`);
  }
}

function validateArgObject(value) {
  if (typeof value != "string") {
    throw new Error("obj must be a string");
  }
  
  if (!OBJ.some(v => v == value)) {
    throw new Error(`obj must be one of '${OBJ.join("', '")}'`);
  }
}

function validatePreverb(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("preverb must be a string or null");
  }
  
  if (!PREVERB.some(p => p == value)) {
    throw new Error(`preverb must be one of '${PREVERB.join("', '")}'`);
  }
}

function validateVersion(value, obj) {
  if (typeof value != "string") {
    throw new Error("version must be a string");
  }
  
  if (!VERSION.some(v => v == value)) {
    throw new Error(`version must be one of '${VERSION.join("', '")}'`);
  }
  
  if (obj != "DIRECT" && value == "SUBJECTIVE") {
    throw new Error(`object must be 'DIRECT' for '${value}' version`);
  }
  
  if (obj != "INDIRECT" && ["OBJECTIVE", "SUPERESSIVE"].some(v => v == value)) {
    throw new Error(`object must be 'INDIRECT' for '${value}' version`);
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

function validateModus(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("modus must be a string or null");
  }
  
  if (!MODUS.some(t => t == value)) {
    throw new Error(`modus must be one of '${MODUS.join("', '")}'`);
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

export function hasVowel(value) {
  return VOWELS.some(v => value.includes(v));
}
