import { Model, Collection } from 'js-abstract-model'

class Comment extends Model {
	constructor (data) {
		super(data, [
			{ key: 'comment' },
			{ key: 'created_at' },
			{ key: 'user' },
		])
	}
}

class CommentList extends Collection {
	model () {
		return Comment
	}
}

export { Comment, CommentList }
