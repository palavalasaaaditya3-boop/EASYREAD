import { useState, DragEvent } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const uploaded = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...uploaded]);

    setAnswer(
      `${uploaded.length} document(s) uploaded successfully and added to the knowledge source.`
    );
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const askQuestion = () => {
    if (files.length === 0) {
      setAnswer('Please upload at least one source document.');
      return;
    }

    setAnswer(
      `Source documents loaded successfully.

Question:
${question}

This UI is ready for AI integration. Once OpenAI/Azure OpenAI is connected, answers will be generated directly from all uploaded documents.`
    );
  };

  return (
    <div className="container">
      <h1>Knowledge Assistant</h1>

      <div
        className="dropZone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p>Drag & Drop Files Here</p>
        <p>OR</p>

        <label className="uploadBtn">
          Upload Documents
          <input
            type="file"
            multiple
            hidden
            accept=".pdf,.doc,.docx,.txt,.msg,.eml"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="sourceBox">
          <h3>Knowledge Sources</h3>

          {files.map((file, index) => (
            <div className="fileItem" key={index}>
              📄 {file.name}
            </div>
          ))}
        </div>
      )}

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question from uploaded source documents..."
      />

      <button onClick={askQuestion}>Ask Question</button>

      {answer && (
        <div className="answerBox">
          <h3>Answer</h3>
          <pre>{answer}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
