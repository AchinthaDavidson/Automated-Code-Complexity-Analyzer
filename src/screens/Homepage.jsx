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
  const [cw,setcw] = useState();
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

  function displayDetails(code) {
    const lines = code.split("\n");
    var variableCounts = countVariables(code);
    var extractedMethods = extractMethods(code);
    var opCount = countOperators(code);
    var methodCallCount = countMethodCalls(code);
    var classCalls = countClassCalls(code);
    var stringnNumCount = countStringLiteralsAndNumerals(code);
    var controlWordCount = countControlWords(code);
    var mergedCounts = {}; // Create an object to store counts by line number
   
    var controlStatments  = findControlStatements(code)
    controlStatments.sort ( (a,b) => a.start - b.start);
 
    var assingLevel = assignLevelsToCode(controlStatments,code)


    // Merge counts for String Literals and Numerals
    stringnNumCount.forEach(item => {
        const lineNumber = item.lineNumber;
        if (!mergedCounts[lineNumber]) {
            mergedCounts[lineNumber] = {
                lineNumber,
                total: 0,
                literalCount: 0,
                methodCallCount: 0,
                classCallCount: 0,
                operatorCount: 0,
                variableCount: 0,
                methodCount: 0, 
                controlWordCount : 0,
                W_inheritance : 0,
                W_nesting : 0,
                W_control : 0,
                W_total : 0 ,
                WC_Value : 0

            };
        }
        mergedCounts[lineNumber].literalCount += item.count;
        mergedCounts[lineNumber].total += item.count;
    });

    // Merge counts for Method Calls
    methodCallCount.forEach(item => {
        const lineNumber = item.lineNumber;
        if (!mergedCounts[lineNumber]) {
            mergedCounts[lineNumber] = {
                lineNumber,
                total: 0,
                literalCount: 0,
                methodCallCount: 0,
                classCallCount: 0,
                operatorCount: 0,
                variableCount: 0,
                methodCount: 0, 
                controlWordCount : 0,
                W_inheritance : 0,
                W_nesting : 0,
                W_control : 0,
                W_total : 0 ,
                WC_Value : 0
            };
        }
        mergedCounts[lineNumber].methodCallCount += item.dotCount;
        mergedCounts[lineNumber].total += item.dotCount;
    });

    // Merge counts for Class Calls
    classCalls.forEach(item => {
        const lineNumber = item.lineNumber;
        if (!mergedCounts[lineNumber]) {
            mergedCounts[lineNumber] = {
                lineNumber,
                total: 0,
                literalCount: 0,
                methodCallCount: 0,
                classCallCount: 0,
                operatorCount: 0,
                variableCount: 0,
                methodCount: 0,
                controlWordCount : 0,
                W_inheritance : 0,
                W_nesting : 0,
                W_control : 0,
                W_total : 0 ,
                WC_Value : 0
            };
        }
        mergedCounts[lineNumber].classCallCount += 4;
        mergedCounts[lineNumber].total += 4;
    });

    // Merge counts for Operators
    opCount.forEach(item => {
        const lineNumber = item.lineNumber;
        if (!mergedCounts[lineNumber]) {
            mergedCounts[lineNumber] = {
                lineNumber,
                total: 0,
                literalCount: 0,
                methodCallCount: 0,
                classCallCount: 0,
                operatorCount: 0,
                variableCount: 0,
                methodCount: 0, 
                controlWordCount : 0,
                W_inheritance : 0,
                W_nesting : 0,
                W_control : 0,
                W_total : 0 ,
                WC_Value : 0
            };
        }
        mergedCounts[lineNumber].operatorCount += item.numberOfOperators;
        mergedCounts[lineNumber].total += item.numberOfOperators;
    });

    // Merge counts for Variables
    variableCounts.forEach(item => {
        const lineNumber = item.lineNumber;
        if (!mergedCounts[lineNumber]) {
            mergedCounts[lineNumber] = {
                lineNumber,
                total: 0,
                literalCount: 0,
                methodCallCount: 0,
                classCallCount: 0,
                operatorCount: 0,
                variableCount: 0,
                methodCount: 0, 
                controlWordCount : 0,
                W_inheritance : 0,
                W_nesting : 0,
                W_control : 0,
                W_total : 0 ,
                WC_Value : 0
            };
        }
        mergedCounts[lineNumber].variableCount += item.varCount;
        mergedCounts[lineNumber].total += item.varCount;
    });

    // Merge counts for Extracted Methods
    extractedMethods.forEach(item => {
        const lineNumber = item.lineNumber;
        if (!mergedCounts[lineNumber]) {
            mergedCounts[lineNumber] = {
                lineNumber,
                total: 0,
                literalCount: 0,
                methodCallCount: 0,
                classCallCount: 0,
                operatorCount: 0,
                variableCount: 0,
                methodCount: 0,
                controlWordCount : 0,
                W_inheritance : 0,
                W_nesting : 0,
                W_control : 0,
                W_total : 0 ,
                WC_Value : 0
            };
        }
        mergedCounts[lineNumber].methodCount += item.returnVal;
        mergedCounts[lineNumber].total += item.returnVal;
    });

    controlWordCount.forEach(item => {
      const lineNumber = item.lineNumber;
      if (!mergedCounts[lineNumber]) {
          mergedCounts[lineNumber] = {
              lineNumber,
              total: 0,
              literalCount: 0,
              methodCallCount: 0,
              classCallCount: 0,
              operatorCount: 0,
              variableCount: 0,
              methodCount: 0,
              controlWordCount : 0,
              W_inheritance : 0,
              W_nesting : 0,
              W_control : 0,
              W_total : 0 ,
              WC_Value : 0
              
          };
      }
      mergedCounts[lineNumber].controlWordCount += item.count;
      mergedCounts[lineNumber].total += item.count;
    });

    assingLevel.forEach(item => {
      const lineNumber = item.lineNumber;
      if (!mergedCounts[lineNumber]) {
          mergedCounts[lineNumber] = {
              lineNumber,
              total: 0,
              literalCount: 0,
              methodCallCount: 0,
              classCallCount: 0,
              operatorCount: 0,
              variableCount: 0,
              methodCount: 0,
              controlWordCount : 0,
              W_inheritance : 0,
              W_nesting : 0,
              W_control : 0,
              W_total : 0 ,
              WC_Value : 0
              
          };
      }
      mergedCounts[lineNumber].W_nesting+= item.wn;
      mergedCounts[lineNumber].W_control+= item.wc;
      mergedCounts[lineNumber].W_total += item.wn + item.wc;
  });

    
    console.log("Merged Counts by Line Number:");
    
const tableData = [];

for (const lineNumber in mergedCounts) {
  const counts = mergedCounts[lineNumber];
  var codeString = lines[counts.lineNumber].replace(/\t/g, '    ').replace(/\r/g, '');
  const lineData = {
    'Line': codeString,
    'S Count': counts.total,
    'W Control ': counts.W_control,
    'W Inheritance': counts.W_inheritance,
    'W Nesting ': counts.W_nesting,
    'W Total Count': counts.W_total,
    'WC Count': counts.W_total * counts.total
  };
  tableData.push(lineData);
}

  //console.table(tableData);
  var classData = findClasses(code);
   console.log(classData)
  var inheritnceData = assignInheritanceLevelsToCode(classData, code)

   //console.log(inheritnceData)


  //console.log(controlStatments)











}






function findClasses(javaCode) {
  // Initialize the result array
  let result = [];

  // Split the code by line breaks
  let lines = javaCode.split(/\r?\n/);

  // Use a regular expression to match class declarations
  let classDeclarationRegex = /^\s*(public|private|protected)?\s*class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(extends\s+([A-Za-z_][A-Za-z0-9_]*))?\s*(implements\s+([A-Za-z_][A-Za-z0-9_,\s]*))?(\s*{)?/;

  let wi = 1; // Initialize the wi variable to 0

  // Loop through the lines
  for (let i = 0; i < lines.length; i++) {
    // Get the current line
    let line = lines[i];

    // Check if the line matches a class declaration
    let match = line.match(classDeclarationRegex);

    if (match) {
      // Check if the class declaration has an opening brace
      if (line.includes("{")) {
        // Initialize the brace count
        let braceCount = 1;

        // Loop through the following lines to find the matching closing brace
        for (let j = i + 1; j < lines.length; j++) {
          let innerLine = lines[j];
          if (innerLine.includes("{")) {
            braceCount++;
          }
          if (innerLine.includes("}")) {
            braceCount--;
          }

          // If the brace count reaches zero, it's the end of the class declaration
          if (braceCount === 0) {
            result.push({
              className: match[2], // Extract the class name
              start: i,
              end: j,
              wi: wi, // Set the wi attribute for the class
            });

            wi++; // Increment wi for the next class
            break;
          }
        }
      } else {
        // If the class declaration does not have an opening brace on the same line,
        // it's a single-line class declaration
        result.push({
          className: match[2], // Extract the class name
          start: i,
          end: i,
          wi: wi, // Set the wi attribute for the class
        });

        wi++; // Increment wi for the next class
      }
    }
  }

  return result;
}















// function findClasses(javaCode) {
//   // Initialize the result array
//   let result = [];

//   // Split the code by line breaks
//   let lines = javaCode.split(/\r?\n/);

//   // Use a regular expression to match class declarations
//   let classDeclarationRegex = /^\s*(public|private|protected)?\s*class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(extends\s+([A-Za-z_][A-Za-z0-9_]*))?\s*(implements\s+([A-Za-z_][A-Za-z0-9_,\s]*))?(\s*{)?/;

//   // Loop through the lines
//   for (let i = 0; i < lines.length; i++) {
//     // Get the current line
//     let line = lines[i];

//     // Check if the line matches a class declaration
//     let match = line.match(classDeclarationRegex);

//     if (match) {
//       // Check if the class declaration has an opening brace
//       if (line.includes("{")) {
//         // Initialize the brace count
//         let braceCount = 1;

//         // Loop through the following lines to find the matching closing brace
//         for (let j = i + 1; j < lines.length; j++) {
//           let innerLine = lines[j];
//           if (innerLine.includes("{")) {
//             braceCount++;
//           }
//           if (innerLine.includes("}")) {
//             braceCount--;
//           }

//           // If the brace count reaches zero, it's the end of the class declaration
//           if (braceCount === 0) {
//             result.push({
//               className: match[2], // Extract the class name
//               start: i,
//               end: j,
//             });
//             break;
//           }
//         }
//       } else {
//         // If the class declaration does not have an opening brace on the same line,
//         // it's a single-line class declaration
//         result.push({
//           className: match[2], // Extract the class name
//           start: i,
//           end: i,
//         });
//       }
//     }
//   }

//   return result;
// }


function assignInheritanceLevelsToCode(classDatas, javaCode) {
  const lines = javaCode.split("\n");
  const codeLevels = [];

  lines.forEach((line, lineNumber) => {
    let wi = 0;


    classDatas.forEach((classDeclared) => {
      if (lineNumber >= classDeclared.start  && lineNumber <= classDeclared.end ) {
        wi += classDeclared.wi || 0;
      }
    });

    // Check if the line contains only brackets, comments, or else statements with brackets
    if (/^(\s*[\{\}\[\]();]|\/\/|\/\*|\*\/|else\s*{)/.test(line)) {
      wi = 0;
    }

    codeLevels.push({ lineNumber, wi });
  });

  return codeLevels;
}






















function assignLevelsToCode(controlStructuresArray, javaCode) {
  const lines = javaCode.split("\n");
  const codeLevels = [];

  lines.forEach((line, lineNumber) => {
    let wn = 0;
    let wc = 0;

    controlStructuresArray.forEach((controlStructure) => {
      if (lineNumber >= controlStructure.start  && lineNumber <= controlStructure.end ) {
        wn += controlStructure.wn || 0;
        wc += lineNumber === controlStructure.start  ? (controlStructure.wc || 0) : 0;
      }
    });

    // Check if the line contains only brackets, comments, or else statements with brackets
    if (/^(\s*[\{\}\[\]();]|\/\/|\/\*|\*\/|else\s*{)/.test(line)) {
      wn = 0;
      wc = 0;
    }

    codeLevels.push({ lineNumber, wn, wc });
  });

  return codeLevels;
}




function findControlStatements(javaCode) {
  // Initialize the result array
  let result = [];

  // Split the code by line breaks
  let lines = javaCode.split(/\r?\n/);

  // Use regular expressions to match control statements
  let controlStatementRegex = /^\s*(if|else if|else|for|while|do|switch|case|default)\s*\(.+\)\s*\{/;

  // Use a stack to keep track of the current control statements and their lines
  let stack = [];

  // Loop through the lines
  for (let i = 0; i < lines.length; i++) {
    // Get the current line
    let line = lines[i];

    // Check if the line matches a control statement
    let match = line.match(controlStatementRegex);

    if (match) {
      // Initialize the wc attribute
      let wc = 0;

      // Check if it's an 'if' condition
      if (match[1] === "if") {
        wc = 1;
      } else if (match[1] === "for" || match[1] === "while") {
        wc = 2;
      }

      // Push the type, start line, and wc to the stack
      stack.push({
        type: match[1],
        start: i,
        wc: wc, // Add the 'wc' attribute
      });
    }

    // Check if the line contains an opening brace
    if (line.includes("{")) {
      // Increment the brace count for the top statement on the stack
      let top = stack[stack.length - 1];
      if (top) {
        top.braces = (top.braces || 0) + 1;
      }
    }

    // Check if the line contains a closing brace
    if (line.includes("}")) {
      // Decrement the brace count for the top statement on the stack
      let top = stack[stack.length - 1];
      if (top) {
        top.braces--;
        // If the brace count reaches zero, pop the statement from the stack and add it to the result array with its level
        if (top.braces === 0) {
          result.push({
            type: top.type,
            start: top.start,
            end: i,
            wn: stack.length, // The level is equal to the length of the stack
            wc: top.wc, // Add the 'wc' attribute to the result
          });
          stack.pop();
        }
      }
    }
  }

  return result;
}


function countLines(text) {
  return text.split('\n').length;
}

function countLinesBefore(text, index) {
  return countLines(text.substring(0, index));
}

//ok
function countStringLiteralsAndNumerals(javaCode) {
  const codeLines = javaCode.split('\n');
  const stringLiteralsAndNumeralsCount = [];

  for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
    const line = codeLines[lineNumber];
    const regexPattern = /("[^"]*")|('[^']*')|(?<!\()\b\d+(\.\d+)?\b(?!\))/g; // Updated pattern

    const matches = line.match(regexPattern) || [];

    stringLiteralsAndNumeralsCount.push({
      lineNumber: lineNumber,
      count: matches.length,
    });
  }

  return stringLiteralsAndNumeralsCount;
}

//ok
  function countMethodCalls(javaCode) {
    const codeLines = javaCode.split('\n');
    const dotCountByLine = [];
  
    for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
      const line = codeLines[lineNumber];
      let dotCount = 0;
  
      // Use a regular expression to find dots and words before and after them
      const dotMatches = line.match(/\./g);
  
      // Check if any non-integer word exists before or after the dot
      const dotMatchesWithWords = line.match(/(\w+)\.(\w+)/g);
      if (dotMatchesWithWords) {
        dotMatchesWithWords.forEach(match => {
          const [wordBeforeDot, wordAfterDot] = match.split('.');
          const isWordBeforeInt = !isNaN(parseInt(wordBeforeDot));
          const isWordAfterInt = !isNaN(parseInt(wordAfterDot));

          if (!isWordBeforeInt && !isWordAfterInt) {
            if(wordBeforeDot==="System"){
              if(wordAfterDot==="out" || wordAfterDot==="print"){
                dotCount = 5;
              }
            }else{
              if (dotMatches) {
                dotCount =3;
              }
            }
          }
        });
      }
  
      dotCountByLine.push({
        lineNumber: lineNumber ,
        dotCount: dotCount
      });
    }
  
    //console.log(dotCountByLine);
    return dotCountByLine;
  }

//ok
function countClassCalls(javaCode) {
  const codeLines = javaCode.split('\n');
  const methodCalls = [];

  for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
    const line = codeLines[lineNumber];
    const regexPattern = /("[^"]*")|('[^']*')|\w+\s*\(\s*\)/g;
    const matches = line.match(regexPattern) || [];

    for (const match of matches) {
      if (!match.startsWith('"') && !match.startsWith("'")) {
        methodCalls.push({
          lineNumber: lineNumber, // Adding 1 to match typical line numbering
          methodCall: match.trim(),
        });
      }
    }
  }

  return methodCalls;
}

//ok
function countControlWords(javaCode) {
  const codeLines = javaCode.split('\n');
  const controlKeywords = /(if|else if|for|while|do while|switch\()/g;
  const controlKeywordsCount = [];

  for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
    const line = codeLines[lineNumber];
    const matches = line.match(controlKeywords) || [];

    controlKeywordsCount.push({
      lineNumber: lineNumber,
      count: matches.length,
    });
  }
  return controlKeywordsCount;
}

//ok
function countOperators(javaCode) {
  const codeLines = javaCode.split('\n');
  var opCount = [];
  const regexPattern = /[!=<>+\-*/%&|^~]+/g;

  for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
    const line = codeLines[lineNumber];
   
    const operators = line.match(regexPattern) || [];
    let numberOfOperators = operators.length;

    const matches = line.match(/-\d+/g);

    if (matches) {
      numberOfOperators -= matches.length;
    }
    opCount.push({lineNumber, numberOfOperators})
    // console.log(`Line ${lineNumber + 1}: Number of Operators - ${numberOfOperators}`);
  }
  return opCount
}

//ok
function countVariables(javaCode) {

  const variableDeclarationRegex = /\b(?:int|double|float|char|String)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:=|\b)(?!args\b)/g;
  let variableCounts = [];
  var variableNamesArray = [];
  const variableDeclarations = javaCode.match(variableDeclarationRegex) || [];
  const variableUsageRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
  const variableUsages = javaCode.match(variableUsageRegex) || [];

  for (let declaration of variableDeclarations) {

    const variableName = declaration.split(/\s+/)[1];
    variableNamesArray.push(variableName);
  }

  const lines = javaCode.split('\n');
  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {

    const line = lines[lineNumber];
    const variableUsageMatches = line.match(variableUsageRegex) || [];
    var varCount = 0;
    let previousWord = null;
    const nextWordAfterCurrent = [];

    for (let word of variableUsageMatches) {
      
      variableNamesArray.forEach((name) => {
        if (name !== "args") {
          if (word === name ) {
            if ( previousWord === "int" || previousWord === "double" || previousWord === "float" || previousWord === "char" || previousWord === "String"){
              const nextIndex = variableUsageMatches.indexOf(word) + 1;
              var nextWord = variableUsageMatches[nextIndex]
              // console.log("declared")
              // console.log(nextWord)
              // console.log(variableDeclarations)
            }else{
              varCount += 1;
              // console.log(" Word is : " + word)
            }
            if (previousWord !== null) {
              // console.log("Previous Word: " + previousWord);
            }
          }
        }
      });
    
      previousWord = word;
    }
   // console.log(" Line num : " + lineNumber + "  Var Count : " + varCount)
  // console.log(nextWordAfterCurrent)
    variableCounts.push({lineNumber,varCount})
  }
 // console.log(variableCounts)
  return variableCounts;
}

//ok
function extractMethods(javaCode) {
  const methodDeclarationRegex = /(public\s+static\s+void\s+main\s*\(.*\))|((public|private|protected|static|final)?\s+\w+\s+\w+\s*\([^)]*\)\s*(throws\s+\w+(?:,\s*\w+)*)?\s*{)/g;
  const methodDeclarations = javaCode.match(methodDeclarationRegex) || [];
  const methodInfo = [];
  const lines = javaCode.split("\n");
  var returnVal ;


  for ( let lineNumber = 0; lineNumber < lines.length; lineNumber++) {

    const line = lines[lineNumber];
    const isClassDeclaration = line.match(/\bclass\b/);
    const methodDeclarationMatch = line.match(/(public\s+static\s+void\s+main\s*\(.*\))|((public|private|protected|static|final)?\s+\w+\s+\w+\s*\([^)]*\)\s*(throws\s+\w+(?:,\s*\w+)*)?\s*{)/);
    
    if (methodDeclarationMatch) {
      returnVal = 2;
    } else {
      returnVal = 0;
    }
    methodInfo.push({lineNumber,returnVal});
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
              {/* {codeLines.map((line, index) => (
                <div key={index}>{line} ........... {calculateTokenCount(line)}</div>
              ))} */}
          </code>

        </div>

    </>
  )
}
export default Home;