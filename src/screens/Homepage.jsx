import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-dracula';
import { Button } from '@mui/material';
const JavaParser = require('java-parser');

function Home() {
  const [code, setCode] = useState('');
  const [codeLines, setCodeLines] = useState([]);
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // get cord into line
  const handleCodeChange = (newCode) => {
    setCode(newCode);

    const codeLiness = code.split('\n');
    setCodeLines(codeLiness);
  };

  // get file input
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileContent = await readFileContent(file);
      setCode(fileContent);
alert(code)
      const codeLiness = code.split('\n');
      setCodeLines(codeLiness);
    
    }
  };

  //read file content
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
 
  function handleSearch(cppCode) {
    // Regular expressions to match various tokens
    const tokenPatterns = [
      /(\w+)\s*\(/g,                // Keywords and functions
      /::/g,                        // :: operator
      /(\w+)\s+/g,                  // Keywords and identifiers
      /'.*?'/g,                     // Characters inside single quotes
      /".*?"/g,                     // Strings inside double quotes
      /[\[\]]/g,                    // Square brackets
      /,/g,                         // Comma operator
      /\bcase\b|\bdefault\b/g,      // case and default in switch
      /\./g,                        // Dot operator
      /\n|;|{|}/g,                  // Newlines, semicolons, curly braces
      /\bendl\b|\\n/g              // Manipulators like endl and "\n"
  ];


    // Calculate the token count
    let tokenCount = 0;

     tokenPatterns.forEach(pattern => {
      const matche = cppCode.match("//");
        const matches = cppCode.match(pattern);
        if (matche!='//'){
          if (matches) {
            tokenCount += matches.length;
        }
        }
         
    });

    return tokenCount;
}
  // function handleSearch(cppCode) {
  //   // Regular expressions to match various tokens
  //   const tokenPatterns = [
  //     /(\w+)\s*\(/g,                // Keywords and functions
  //     /::/g,                        // :: operator
  //     /(\w+)\s+/g,                  // Keywords and identifiers
  //     /'.*?'/g,                     // Characters inside single quotes
  //     /".*?"/g,                     // Strings inside double quotes
  //     /[\[\]]/g,                    // Square brackets
  //     /,/g,                         // Comma operator
  //     /\bcase\b|\bdefault\b/g,      // case and default in switch
  //     /\./g,                        // Dot operator
  //     /\n|;|{|}|<<|>>|/g,                  // Newlines, semicolons, curly braces
  //     /\bendl\b|\\n/g              // Manipulators like endl and "\n"
  // ];



  //   // Calculate the token count
  //   let tokenCount = 0;

  //   tokenPatterns.forEach(pattern => {
  //     const matche = cppCode.match("//");
  //       const matches = cppCode.match(pattern);
  //       if (matche!='//'){
  //         if (matches) {
  //           tokenCount += matches.length;
  //       }
  //       }
         
  //   });

  //   return tokenCount;
// }

// function calculateWCC(codeSnippet) {
//   // Tokenization based on guidelines
//   const tokens = codeSnippet
//     .replace(/(["'])(?:\\\1|.)*?\1/g, '') // Remove content inside quotes
//     .split(/[,\s]/)
//     .filter(token => token.length > 0);

//   // Token weight mapping
//   const tokenWeights = {
//     operators: ['+', '-', '*', '/', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>='],
//     keywords: ['if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'catch', 'return','void'],
//     manipulators: ['endl', '\\n'],
//     brackets: ['(', ')', '{', '}', '[', ']','.'],
//   };

//   // Calculate token size
//   let wcc = 0;
//   for (const token of tokens) {
//     let tokenSize = 0; // Default token size is 1

//     // Check for operators, keywords, manipulators, brackets
//     if (tokenWeights.operators.includes(token)) {
//       tokenSize = 2;
//     } else if (tokenWeights.keywords.includes(token)) {
//       tokenSize = 1;
//     } else if (tokenWeights.manipulators.includes(token)) {
//       tokenSize = 2;
//     } else if (tokenWeights.brackets.includes(token)) {
//       tokenSize = 1;
//     }

//     wcc += tokenSize;
//   }

//   return wcc;
// }



  return (
    <>
      <AceEditor
        mode="javascript" // Change to the desired language mode
        theme="dracula" // Change to the desired theme
        value={code}
      onChange={handleCodeChange}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={true}


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
      <Button variant="contained" color="success" >
          Success
        </Button>

        <div style={{background:"white"}}>
        <code >
              {codeLines.map((line, index) => (
                <div key={index}>{line} ........... {calculateWCC(line)}</div>
              ))}
          </code>

        </div>

    </>
  )
}
export default Home;