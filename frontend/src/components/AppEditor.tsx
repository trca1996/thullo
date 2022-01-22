import { Editor, EditorState, RichUtils } from "draft-js";
import styled from "styled-components";
import EditorButton from "./EditorButton";
import Icon from "./Icon";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: <Icon name="format_bold" /> },
  { label: "Italic", style: "ITALIC", icon: <Icon name="format_italic" /> },
  {
    label: "Underline",
    style: "UNDERLINE",
    icon: <Icon name="format_underlined" />,
  },
];

const InlineStyleControls = ({
  editorState,
  onToggle,
}: {
  editorState: EditorState;
  onToggle: (type: string) => void;
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <Controls>
      {INLINE_STYLES.map((type) => (
        <EditorButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          Icon={type.icon}
        />
      ))}
    </Controls>
  );
};

const BLOCK_TYPES = [
  { label: "H3", style: "header-three", icon: <Icon name="title" /> },
  {
    label: "UL",
    style: "unordered-list-item",
    icon: <Icon name="format_list_bulleted" />,
  },
  {
    label: "OL",
    style: "ordered-list-item",
    icon: <Icon name="format_list_numbered" />,
  },
];

const BlockStyleControls = ({
  editorState,
  onToggle,
}: {
  editorState: EditorState;
  onToggle: (type: string) => void;
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <Controls>
      {BLOCK_TYPES.map((type) => (
        <EditorButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          Icon={type.icon}
        />
      ))}
    </Controls>
  );
};

const AppEditor: React.FC<{
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}> = ({ editorState, setEditorState }) => {
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <EditorContainer>
      <div style={{ display: "flex" }}>
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
      <EditorWrapper>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          spellCheck={false}
        />
      </EditorWrapper>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  padding: 1.5rem;
  border-radius: 1rem;
`;

const EditorWrapper = styled.div`
  cursor: text;
  font-size: 12px;

  .public-DraftEditorPlaceholder-root,
  .public-DraftEditor-content {
    margin: 0 -15px -15px;
    padding: 0 1.5rem 1.5rem 1.5rem;
  }

  .public-DraftEditor-content {
    min-height: 100px;
  }

  ul,
  ol {
    margin: 0;
  }
`;

const Controls = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  user-select: none;
`;

export default AppEditor;
