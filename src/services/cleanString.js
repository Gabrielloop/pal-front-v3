export function cleanAString(string) {
  try {
    return string.replace(/[^a-zA-Z0-9 ]/g, '').trim()
  } catch (error) {
    console.error(error)
  }
}

export function removeContentInBrackets(string) {
  try {
    return string.replace(/\(.*?\)/g, '').trim()
  } catch (error) {
    console.error(error)
  }
}

export function removeAfterSlash(string) {
  try {
    return string.split(' /')[0].trim()
  } catch (error) {
    console.error(error)
  }
}

export function removeAfterSemicolon(string) {
  try {
    return string.split(' ;')[0].trim()
  } catch (error) {
    console.error(error)
  }
}

export function removeAfterFirstParentheses(string) {
  try {
    return string.split(' (')[0].trim()
  } catch (error) {
    console.error(error)
  }
}

export function cleanTitle(title) {
  try {
    const titleWithoutSlash = removeAfterSlash(title) || title
    const titleWithoutSemicolon = removeAfterSemicolon(titleWithoutSlash) || titleWithoutSlash
    return removeContentInBrackets(titleWithoutSemicolon)
  } catch (error) {
    console.error(error)
  }
}

export function cleanCreatorName(creator) {
  try {
    const cleanedCreator = creator.replace(/. Auteur du texte/g, '').trim()
    return removeAfterFirstParentheses(cleanedCreator)
  } catch (error) {
    console.error(error)
  }
}
