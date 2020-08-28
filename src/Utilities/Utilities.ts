import { imageItem } from '../Interfaces/Interfaces';
export function makeImageGroup(data: Array<imageItem> | undefined): Array<Array<imageItem>> {
	if (data === undefined || data.length === 0) {
	  return []
	}
	const imageGroup: Array<Array<imageItem>> = []
	for (let i=0; i<data.length; i++) {
	  if (i % 3 === 0) {
		imageGroup.push([]);
	  }
	  let lastRow = imageGroup.length - 1;
	  const item: imageItem = {...data[i]};
	  imageGroup[lastRow].push(item)
	}
	return imageGroup
}

export let allWords: Set<string> = new Set()

export async function getWords() {
	const url = process.env.REACT_APP_WORDS_URL;
	if (url) {
		try {
			const res = await fetch(url)
			const data = await res.text();
			allWords = new Set(data.split('\n'))
		} catch(err) {
			console.log(err)
		}
	}
}

function isVowel(char: string):boolean {
	if (char === 'a' || char ==='e' || char === 'i' || char === 'o' || char === 'u') {
		return true
	}
	return false
}

function subAllVowels(potentialTerms: Set<string>, term: Array<string>, start: number) {
	let vewols = 'aeiou';
	for(let i=start; i<term.length; i++) {
		if (isVowel(term[i])) {
			for (let j=0; j<vewols.length; j++) {
				term[i] = vewols[j]
				subAllVowels(potentialTerms, term, i+1)
				potentialTerms.add(term.join(''))
			}
		}
	}
	return potentialTerms;
}
export function spellCheck(term: string):string {
	term = term.replace(/[\W\d]/ig, "");
	if (allWords.has(term)) {
		return term;
	}
	let res: string | null = null;
	let potentialTerms:Set<string> = subAllVowels(new Set(), term.split(''), 0)
	potentialTerms.forEach(potentialTerm => {
		if (allWords.has(potentialTerm) && res === null) {
			res = potentialTerm
		}
	})
	return res || term;
}



