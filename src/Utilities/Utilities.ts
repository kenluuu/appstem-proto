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

function getShortestEditDistance(term: string, words: Set<string>) {
	let minEdits = Number.MAX_VALUE;
	let correctedWord = '';
	words.forEach(word => {
		let edits = getShortestEditHelper(term, word);
		if (edits < minEdits) {
			minEdits = edits
			correctedWord = word
		}
	});
	return correctedWord;

}

function getShortestEditHelper(str1: string, str2: string): number {
	let dp = [];
	let n = str1.length + 1;
	let m = str2.length + 1;
	for(let i=0; i<n; i++) {
		let arr = []
		for (let j=0; j<m; j++) {
			arr.push(0)
		}
		dp.push(arr)
	}
	for(let i=0; i<n; i++) {
		for (let j=0; j<m; j++) {
			if (i === 0 && j === 0) {
				continue;
			} else if (i === 0) {
				dp[i][j] = dp[i][j-1] + 1
			} else if (j === 0) {
				dp[i][j] = dp[i-1][j] + 1
			} else {
				if (str1[i-1] === str2[j-1]) {
					dp[i][j] = dp[i-1][j-1]
				} else {
					dp[i][j] = Math.min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j]) + 1
				}
			}
		}
	}
	return dp[n-1][m-1]
}
export function spellCheck(term: string):string {
	if (allWords.has(term)) {
		return term;
	}
	let suggestedWord = getShortestEditDistance(term, allWords);
	return suggestedWord;
}



