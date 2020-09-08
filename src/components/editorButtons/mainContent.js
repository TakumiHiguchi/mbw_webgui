import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar: Function = (): void => {
    let { editorState, onChange } = this.props;
    
    let curHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    curHtml += '<blockquote>ここに歌詞を追加</blockquote><div style="text-align: right;"><span style="font-size: 80%;">歩く -ヨルシカ</span></div><p>ここに解釈を追加</p>'
    console.log(curHtml)
    const contentBlock = htmlToDraft(curHtml);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      editorState = EditorState.createWithContent(contentState);
    }

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '',
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  render() {
    return (
      <div className="rdw-option-wrapper" onClick={this.addStar}>
        歌詞考察コンポーネント
      </div>
    );
  }
}