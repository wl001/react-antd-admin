import React from 'react'
import { Button, Card, Modal } from 'antd'
//富文本
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// 编辑器内容转换为普通HTML的库
import draftjs from 'draftjs-to-html'
export default class RichText extends React.Component {
    state = {
        showRichText: false,
        editorContent: '',
        editorState: '',
    };
    //清空内容
    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }
    //获取HTML文本
    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }
    //编辑器内容发生变化获取内容 把输入的内容转换成对象
    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };
    //编辑器状态发生变化
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };
    render() {     
        const {editorState} = this.state
        return(
            <div>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={() => {
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.editorContent)}
                </Modal>
            </div>
        )
    }
}