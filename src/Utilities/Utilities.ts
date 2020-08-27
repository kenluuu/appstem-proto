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

