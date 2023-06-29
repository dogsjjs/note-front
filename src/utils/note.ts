export const getTagIcon = (tag: string) => {
	if (tag === 'personal') {
		return 'heroicons:user';
	}
	if (tag === 'work') {
		return 'heroicons:identification';
	}
	if (tag === 'social') {
		return 'heroicons:sparkles';
	}
	if (tag === 'important') {
		return 'heroicons:exclamation-circle';
	}
	return 'heroicons:arrow-path'
}

export const showTagTest = (tag: String) => {
	if (tag === 'personal') {
		return '个人'
	} else if (tag === 'work') {
		return '工作'
	} else if (tag === 'social') {
		return '社交'
	} else if (tag === 'important') {
		return '重要'
	} else {
		return ''
	}
};