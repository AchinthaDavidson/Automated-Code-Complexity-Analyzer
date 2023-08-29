import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript'; // Replace with the appropriate mode
import 'ace-builds/src-noconflict/theme-dracula'; // Replace with the desired theme
import hljs from 'highlight.js';
import { Button } from '@mui/material';
import 'highlight.js/styles/default.css'; // Import the default highlight.js styles
// import './CodeLanguageDetection.css'; // Import your custom CSS file

function CodeLanguageDetection() {
  const [code, setCode] = useState('');
  const [codeLines, setCodeLines] = useState([]);
  const [detectedLanguage, setDetectedLanguage] = useState('');

function setNewcode(code){
  setCode(code);

}

  const handleCodeChange = (newCode) => {
    setCode(newCode);

    const codeLiness = code.split('\n');
    setCodeLines(codeLiness);

    codeLines.map((line, index) => (
      console.log(line)
    ))

    const language = hljs.highlightAuto(code).language;
    setDetectedLanguage(language);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileContent = await readFileContent(file);
      setCode(fileContent);
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };



  const [searchResults, setSearchResults] = useState([]);

  function handleSearch() {
    // Search for Java keywords and identifiers
    const keywords = [
      'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
      'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final',
      'finally', 'float', 'for', 'if', 'implements', 'import', 'instanceof', 'int', 'interface',
      'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'short',
      'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient',
      'try', 'void', 'volatile', 'while', 'System', 'out', 'print', 'println'
    ];

    const regexKeywords = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    const foundKeywords = code.match(regexKeywords) || [];

    const regexIdentifiers = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
    const foundIdentifiers = code.match(regexIdentifiers) || [];

    const regexStrings = /(['"])(?:(?=(\\?))\2.)*?\1/g;
    const foundStrings = code.match(regexStrings) || [];

    const regexArrays = /\b[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*\]/g;
    const foundArrays = code.match(regexArrays) || [];

    const regexCommas = /,/g;
    const foundCommas = code.match(regexCommas) || [];

    const regexVariableDefinitions = /\b[a-zA-Z_][a-zA-Z0-9_]*\s+[a-zA-Z_][a-zA-Z0-9_]*\s*,?/g;
    const foundVariableDefinitions = code.match(regexVariableDefinitions) || [];

    const regexDecisionalStatements = /\b(if-?else|else-?if|for|while|do-?while|switch)\s*\([^)]*\)/g;
    const foundDecisionalStatements = code.match(regexDecisionalStatements) || [];

    const results = [...foundKeywords, ...foundStrings, ...foundArrays, ...foundIdentifiers, ...foundCommas, ...foundVariableDefinitions, ...foundDecisionalStatements];
    setSearchResults(results);
    console.log(searchResults)
  };


























  return (
    <div className="code-container">
      <div className="code-input">

        <AceEditor
          mode="javascript" // Change to the desired language mode
          theme="dracula" // Change to the desired theme
          value={code}
          onChange={setNewcode(code)}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          showPrintMargin={true}

          className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          variant="outlined"
          component="label"
          color='success'
        >
          Upload File
          <input
            type="file"
            hidden
            accept=".txt,.js,.java,.py,.jsx" // Add accepted file types here
            onChange={handleFileChange}
          />
        </Button>
        <Button variant="contained" color="success"  onClick={handleCodeChange}>
          Success
        </Button>

      </div>

      <div className="code-output">
        <div className="output-content bg-white p-4 rounded-lg shadow">
          <pre className="whitespace-pre-wrap break-words">
            <code className={`language-${detectedLanguage}`}>
              {codeLines.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </code>
          </pre>
          {/* <p className="mt-2 text-gray-600">Detected Language: {detectedLanguage}</p> */}
        </div>

        <button onClick={handleSearch}>jjjj</button>

      </div>
    </div>
  );
}

export default CodeLanguageDetection;
