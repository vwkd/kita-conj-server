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
    ? person_o == "S3" || person_o == "P3"
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
      return {
        ...version,
        value: select_version(version.value, person_o),
      };
    },
    set version(value) {
      validateVersion(value);
      version.value = value;
      version.note = undefined;
    },
    set versionExc(patch) {
      if (patch) {
        const { value, note } = patch;
        validateVersion(value);
        validateNote(note);
        version.value = value;
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

export function merge_person1(pre_s, pre_o, person_s, person_o, obj) {

  // reflexivity not possible
  // pz_o S1 and pz_s S1, pz_o S1 and pz_s P1, pz_o P1 and pz_s S1, pz_o P1 and pz_s P1
  // pz_o S2 and pz_s S2, pz_o S2 and pz_s P2, pz_o P2 and pz_s S2, pz_o P2 and pz_s P2
  if ((person_o.slice(-1) == "1" || person_o.slice(-1) == "2") && person_o.slice(-1) == person_s.slice(-1)) {
    throw new Error(`merge_person1: can't merge person_o '${person_o}' and person_s '${person_s}'`);
  }

  // pz_o X2 supplants pz_s X1
  if (person_o.endsWith("2") && person_s.endsWith("1")) {
    return pre_o ? pre_o : pre_s;
  }

  // pz_s P3 supplants pz_o P2
  if (person_s == "P3" && person_o == "P2") {
    return pre_s ? pre_s : pre_o;
  }

  // pz_o P2 appended after pz_s S3
  // note: omit pre_s because always null!
  if (person_o == "P2" && person_s == "S3") {
    return pre_o;
  }

  // (ONLY IO) pz_o X3 appended after pz_s X
  if (obj == "INDIRECT" && person_o.endsWith("3")) {
    return pre_s + pre_o;
  }

  // check that at most one is non-empty
  if (pre_s && pre_o) {
    throw new Error(`merge_person1 person_s '${person_s}' person_o '${person_o}': both pre_s '${pre_s}' and pre_o '${pre_o}' are non-empty`)
  }

  // use non-empty one if any
  // note: order doesn't matter since at most one is non-empty
  return pre_s ? pre_s : pre_o;
}

export function merge_person2(post_s, post_o, person_s, person_o, obj) {

  // reflexivity not possible
  // pz_o S1 and pz_s S1, pz_o S1 and pz_s P1, pz_o P1 and pz_s S1, pz_o P1 and pz_s P1
  // pz_o S2 and pz_s S2, pz_o S2 and pz_s P2, pz_o P2 and pz_s S2, pz_o P2 and pz_s P2
  if ((person_o.slice(-1) == "1" || person_o.slice(-1) == "2") && person_o == person_s) {
    throw new Error(`merge_person2: can't merge person_o '${person_o}' and person_s '${person_s}'`);
  }
  
  // pz_o X2 supplants pz_s X1
  if (person_o.endsWith("2") && person_s.endsWith("1")) {
    return post_o ? post_o : post_s;
  }

  // pz_s P3 supplants pz_o P2
  if (person_s == "P3" && person_o == "P2") {
    return post_s ? post_s : post_o;
  }

  // pz_o P2 appended after pz_s S3, pz_s S3 looses trailing -ს if any
  if (person_o == "P2" && person_s == "S3") {
    const post_s_clean = post_s.replace(/ს$/, '');
    return post_s_clean + post_o;
  }

  // (ONLY IO) pz_o X3 appended after pz_s X
  // TODO: maybe delete post_o since always empty or move before post_s?
  if (obj == "INDIRECT" && person_o.endsWith("3")) {
    return post_s + post_o;
  }

  // check that at most one is non-empty
  if (post_s && post_o) {
    throw new Error(`merge_person2 person_s '${person_s}' person_o '${person_o}': both post_s '${post_s}' and post_o '${post_o}' are non-empty`)
  }

  // use non-empty one if any
  // note: order doesn't matter since at most one is non-empty
  return post_s ? post_s : post_o;
}
