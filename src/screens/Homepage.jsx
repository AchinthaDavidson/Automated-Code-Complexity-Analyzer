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
  function calculateTokenCount(codeLine) {
    
    //var oprandCount = countOperands(codeLine);
    //var methodCount = countMethods(codeLine);

    var opratorCount =  countOperators(codeLine);
    var stringCount =  countStringLiterals(codeLine)
    var variableCounts = countVariables(code);
    var extractedMethods = extractMethods(code);


    console.log("------------------------------------------------ " )

    for (const methodName in extractedMethods) {
      const lineNumbers = extractedMethods[methodName].join(', ');
      console.log(`Method: ${methodName}, Line Numbers: ${lineNumbers}`);
    }


    // for (const variableName in variableCounts) {
    //   const count = variableCounts[variableName].count;
    //   const uniqueLines = [...new Set(variableCounts[variableName].lines)];
  
    //   console.log(`${variableName}: Count ${count}, Lines: ${uniqueLines.join(', ')}`);
    // }

    //console.log("Line is ---------- " + codeLine)
    //console.log("Operator Count ----- " + opratorCount)
 
    //console.log("Variable Count ---------------------" )
    //console.log("String Count ----- " + stringCount)
    //console.log("Total Count "+tokenCount+"------------------------------------------------------------")

    //console.log("Operand Count ----- " + oprandCount)
    //console.log("Method Count ----- " + methodCount)
    //console.log("Token Count ----- " + tokenCount)

    return stringCount;
}

function countVariables(javaCode) {
  const variableDeclarationRegex = /\b(?:int|double|float|char|String)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:=|\b)(?!args\b)/g;

  // Create a map to store the number of times each variable appears and its line numbers.
  let variableCounts = {};

  // Match variable declarations in the Java code using regex.
  const variableDeclarations = javaCode.match(variableDeclarationRegex) || [];

  // Match variable usages in the Java code using regex.
  const variableUsageRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
  const variableUsages = javaCode.match(variableUsageRegex) || [];

  // Iterate over variable declarations and extract variable names.
  for (let declaration of variableDeclarations) {
    const variableName = declaration.split(/\s+/)[1];
    variableCounts[variableName] = { count: 0, lines: [] };
  }

  // Iterate over variable usages and update counts and line numbers.
  const lines = javaCode.split('\n');
  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber];
    const variableUsageMatches = line.match(variableUsageRegex) || [];

    for (let word of variableUsageMatches) {
      if (variableCounts.hasOwnProperty(word)) {
        variableCounts[word].count++;
        variableCounts[word].lines.push(lineNumber + 1);
      }
    }
  }

  // Remove "args" from the variableCounts map
  delete variableCounts["args"];

  // Return the map of variable counts and line numbers.
  return variableCounts;
}

function countOperators(codeLine) {

  const regexPattern = /[!=<>+\-*/%&|^~]+/g;
  var operators = codeLine.match(regexPattern) || [];
  var numberOfOperators = operators.length;
  var hasNumericalValue = /[0-9]/g.test(codeLine);
  if (hasNumericalValue) {
    numberOfOperators -= operators.filter(operator => operator === '-').length;
  }
  return numberOfOperators;
}

function countStringLiterals(codeLine) {
  const regexPattern = /("[^"]*")|('[^']*')/g;
  const matches = codeLine.match(regexPattern) || [];
  return matches.length;
}


function extractMethods(javaCode) {
  // Define a regular expression pattern to match method declarations
  const methodDeclarationRegex = /(?:public|private|protected|static|final)?\s+(?:\w+\s+)?\w+\s+(\w+)\s*\([^)]*\)\s*(?:throws\s+\w+(?:,\s*\w+)*)?\s*{/g;

  // Match method declarations in the Java code using regex
  const methodDeclarations = javaCode.match(methodDeclarationRegex) || [];

  // Create an object to store method information
  const methodInfo = {};

  // Split Java code into lines
  const lines = javaCode.split('\n');

  // Iterate over method declarations and extract method names and line numbers
  methodDeclarations.forEach((declaration) => {
    const methodName = declaration.match(/(\w+)\s*\(/)[1];
    const lineNumber = lines.findIndex((line) => line.includes(declaration)) + 1;

    if (!methodInfo[methodName]) {
      methodInfo[methodName] = [];
    }
    methodInfo[methodName].push(lineNumber);
  });

  return methodInfo;
}

// function countMethods(javaCode) {
//   // Define a regular expression pattern to match method declarations
//   const methodDeclarationRegex = /(?:public|private|protected|static|final)?\s+(?:\w+\s+)?\w+\s+(\w+)\s*\([^)]*\)\s*(?:throws\s+\w+(?:,\s*\w+)*)?\s*{/g;

//   // Match method declarations in the Java code using regex
//   const methodDeclarations = javaCode.match(methodDeclarationRegex) || [];

//   // Return the count of methods
//   return methodDeclarations.length;
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
                <div key={index}>{line} ........... {calculateTokenCount(line)}</div>
              ))}
          </code>

        </div>

    </>
  )
}
export default Home;