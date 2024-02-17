import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBold,
	faItalic,
	faStrikethrough,
	faListUl,
	faListOl,
	faQuoteRight,
	faUndo,
	faRedo,
} from '@fortawesome/free-solid-svg-icons';

const MenuBar = ({ editor }) => {
	if (!editor) {
		return null;
	}

	function handleHeadingSelect(value, editor) {
		switch (true) {
			// Handle paragraphs
			case value === 'paragraph':
				editor.chain().focus().setParagraph().run();
				break;
			case !isNaN(value):
				editor
					.chain()
					.focus()
					.toggleHeading({ level: Number(value) })
					.run();
				break;
		}
	}

	return (
		<>
			<div className="control-group control-group--long">
				<select
					onChange={(e) =>
						handleHeadingSelect(e.target.value, editor)
					}
					title="Select Font Size"
				>
					<option
						value={'paragraph'}
						selected={editor.isActive('paragraph')}
					>
						Paragraph
					</option>
					<option
						value={4}
						selected={editor.isActive('heading', { level: 4 })}
					>
						Heading
					</option>
				</select>
			</div>
			<div className="control-group">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'is-active' : ''}
					title="Bold"
					type="button"
				>
					<FontAwesomeIcon icon={faBold} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'is-active' : ''}
					title="Italic"
					type="button"
				>
					<FontAwesomeIcon icon={faItalic} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={editor.isActive('strike') ? 'is-active' : ''}
					title="Strikethrough"
					type="button"
				>
					<FontAwesomeIcon icon={faStrikethrough} />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleBulletList().run()
					}
					className={editor.isActive('bulletList') ? 'is-active' : ''}
					title="Bullet List"
					type="button"
				>
					<FontAwesomeIcon icon={faListUl} />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleOrderedList().run()
					}
					className={
						editor.isActive('orderedList') ? 'is-active' : ''
					}
					title="Ordered List"
					type="button"
				>
					<FontAwesomeIcon icon={faListOl} />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleBlockquote().run()
					}
					className={editor.isActive('blockquote') ? 'is-active' : ''}
					title="Blockquote"
					type="button"
				>
					<FontAwesomeIcon icon={faQuoteRight} />
				</button>
				<button
					onClick={() => editor.chain().focus().undo().run()}
					title={'Undo'}
					type="button"
				>
					<FontAwesomeIcon icon={faUndo} />
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					title={'Redo'}
					type="button"
				>
					<FontAwesomeIcon icon={faRedo} />
				</button>
			</div>
		</>
	);
};

export default (props) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: props.content,
		onBlur({ editor }) {
			props.getContent(editor.getHTML());
		},
	});

	React.useEffect(() => {
		if (editor) {
			editor.commands.setContent(props.content);
		}
	}, [props.content, editor]);

	return (
		<div className={'editorBox'}>
			<div className={'editorBox__controls'}>
				<MenuBar editor={editor} />
			</div>
			<div className={'editorBox__editor'}>
				<EditorContent content={props.content} editor={editor} />
			</div>
		</div>
	);
};
