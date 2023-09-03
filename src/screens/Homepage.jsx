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


  function displayDetails(code){

    var variableCounts = countVariables(code);
    var extractedMethods = extractMethods(code);

    console.log("------------------------------------------------ " )
    for (const variableName in variableCounts) {

      const count = variableCounts[variableName].count;
      const uniqueLines = [...new Set(variableCounts[variableName].lines)];
      console.log(`${variableName}: Count ${count}, Lines: ${uniqueLines.join(', ')}`);

    }
    
    // console.log("Method Count" )
    // for (const methodName in extractedMethods) {
    //   const lineNumbers = extractedMethods[methodName].join(', ');
    //   console.log(`Method: ${methodName}, Line Numbers: ${lineNumbers}`);
    // }

    // console.log(" Variable Count" )
    // for (let lineNumber in variableCounts) {
    //   const variableCount = variableCounts[lineNumber];
    //   console.log(`Line ${lineNumber}: Count = ${variableCount}`);
    // }
    // for (const variableName in variableCounts) {
    //   const count = variableCounts[variableName].count;
    //   const uniqueLines = [...new Set(variableCounts[variableName].lines)];
  
    //   console.log(`${variableName}: Count ${count}, Lines: ${uniqueLines.join(', ')}`);
    // }

  }



function countVariables(javaCode) {

  const variableDeclarationRegex = /\b(?:int|double|float|char|String)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:=|\b)(?!args\b)/g;
  let variableCounts = {};
  var variableNamesArray = [];
  const variableDeclarations = javaCode.match(variableDeclarationRegex) || [];
  const variableUsageRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
  const variableUsages = javaCode.match(variableUsageRegex) || [];

  for (let declaration of variableDeclarations) {

    const variableName = declaration.split(/\s+/)[1];
    variableNamesArray.push(variableName);
  }

  const lines = javaCode.split('\n');
  for (let lineNumber = 1; lineNumber < lines.length; lineNumber++) {

    const line = lines[lineNumber];
    const variableUsageMatches = line.match(variableUsageRegex) || [];
    var varCount = 0;
    let previousWord = null; // Initialize the previous word as null

    for (let word of variableUsageMatches) {
      
      variableNamesArray.forEach((name) => {
        if (name !== "args") {
          if (word === name ) {

            if ( previousWord === "int" || previousWord === "double" || previousWord === "float" || previousWord === "char" || previousWord === "String"){
              //console.log("Declaration");
            }else{
              varCount += 1;
              //console.log(" Word is : " + word)
            }
            if (previousWord !== null) {
              //console.log("Previous Word: " + previousWord);
            }
          }
        }
      });
    
    
      previousWord = word;

      // for ( variables in variableNamesArray) {
      //   if(variables == word){
      //     console.log(word);
      //   }
      //   // variableCounts[word].count++;
      //   // variableCounts[word].lines.push(lineNumber + 1);
      // }

    }
    console.log(" Line num : " + lineNumber + "  Var Count : " + varCount)

  }

  console.log(variableCounts)
  return variableCounts;

}


 


function calculateTokenCount(codeLine) {
    
  //var oprandCount = countOperands(codeLine);
  //var methodCount = countMethods(codeLine);
  var opreratorCount =  countOperators(codeLine);
  var stringCount =  countStringLiterals(codeLine)
  var variableCounts = countVariables(code);
  var extractedMethods = extractMethods(code);


 
  //console.log("Line is ---------- " + codeLine)

  //console.log("Variable Count ---------------------" )
 // console.log("String Count ----- " + stringCount)
  //console.log("Total Count "+tokenCount+"------------------------------------------------------------")

  //console.log("Operand Count ----- " + oprandCount)
  //console.log("Method Count ----- " + methodCount)
  //console.log("Token Count ----- " + tokenCount)

  return stringCount;
}

function countStringLiterals(codeLine) {
  const regexPattern = /("[^"]*")|('[^']*')/g;
  const matches = codeLine.match(regexPattern) || [];
  return matches.length;
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

function extractMethods(javaCode) {
  const methodDeclarationRegex = /(?:public|private|protected|static|final)?\s+(?:\w+\s+)?\w+\s+(\w+)\s*\([^)]*\)\s*(?:throws\s+\w+(?:,\s*\w+)*)?\s*{/g;
  const methodDeclarations = javaCode.match(methodDeclarationRegex) || [];
  const methodInfo = {};
  const lines = javaCode.split("\n");
  for (const declaration of methodDeclarations) {
    const methodName = declaration.match(/(\w+)\s*\(/)[1];
    // The line number should be the index of the line that contains the method declaration, plus 1.
    var lineNumber = lines.findIndex((line) => line.includes(declaration)) + 1;
    if(lineNumber == 0){
      lineNumber = 1;
    }

    if (!methodInfo[methodName]) {
      methodInfo[methodName] = [];
    }
    methodInfo[methodName].push(lineNumber);
  }

  return methodInfo;
}


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
          accept=".txt,.js,.java" // Add accepted file types here
          onChange={handleFileChange}
        />
      </Button>
      <Button variant="contained" color="success" 
      onClick={()=>displayDetails(code)}>
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