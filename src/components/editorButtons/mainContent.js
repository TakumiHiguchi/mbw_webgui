import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Modal from './mainContentModal'

export default class CustomOption extends Component {
  constructor(props){
    super(props);
    this.state={
      expanded:false
    }
  }
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  modelClose(type,value){
    if(type)this.addStar(value)
    this.setState({expanded:!this.state.expanded})
  }

  addStar(value){
    let { editorState, onChange } = this.props;
    let curHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if(curHtml == "<p></p>")curHtml = ""
    curHtml += '<blockquote>'+ value +'</blockquote><div style="text-align: right;"><span style="font-size: 80%;">' + this.props.musicName +' -'+this.props.artist+'</span></div><p><#interprationBlock></p><p>ここに解釈を執筆</p><p>&lt;/#interprationBlock&gt;</p><p>ここから考察を執筆</p>'
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

    if(this.props.artist && this.props.musicName){
      onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    }
    
  };

  render() {
    return (
      <>
        <div className="rdw-option-wrapper" onClick={() => this.setState({expanded:!this.state.expanded})}>
          歌詞を追加
        </div>
        {this.state.expanded ? <Modal close={(type,value) => this.modelClose(type,value)}/> : undefined}
      </>
    );
  }
}