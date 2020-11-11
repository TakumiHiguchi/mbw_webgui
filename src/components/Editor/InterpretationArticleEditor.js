import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import MainContentButton from "../editorButtons/mainContent";

let nTimer;
class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    const html = this.props.htmlIns;
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState,
      content:html
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    if(nTimer){clearTimeout(nTimer);}
    nTimer = setTimeout(async () => {
      const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const count = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(content.replace( /<blockquote>(.*)<\/blockquote>/g , "" )).contentBlocks)).getCurrentContent().getPlainText().length
      this.props.change(content, count)
    }, 500);
  };
  handleOnChange = (val) =>{
    this.setState({
      content:val
    });
    if(nTimer){clearTimeout(nTimer);}
    nTimer = setTimeout(async () => {
      const contentBlock = htmlToDraft(val);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      this.setState({
        editorState
      });
      const count = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(content.replace( /<blockquote>(.*)<\/blockquote>/g , "" )).contentBlocks)).getCurrentContent().getPlainText().length
      this.props.change(content, count)
    }, 500);
  }

  render() {
    const { editorState } = this.state;
    return (
      <>
        {this.props.isClassicEditor ?
          <textarea value={this.state.content} onChange={(val) => this.handleOnChange(val.target.value)} style={{width:'100%',height:'100%'}}/>
        :
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbarCustomButtons={[<MainContentButton musicName={this.props.musicName} artist={this.props.artist}/>]}
          />
        }
      </>
    )
  }
}


export default ControlledEditor;