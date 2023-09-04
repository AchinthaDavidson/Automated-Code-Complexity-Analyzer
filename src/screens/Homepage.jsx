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
    var wc = findControlStatements(code)
    wc.sort ( (a,b) => a.start - b.start);
    var assingLevel = assignLevelsToCode(wc, lines.length,code)

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
      mergedCounts[lineNumber].W_nesting+= item.level;
      mergedCounts[lineNumber].W_total += item.level;
  });

    
    console.log("Merged Counts by Line Number:");
    for (const lineNumber in mergedCounts) {
      const line = lines[lineNumber];
      const counts = mergedCounts[lineNumber];
      console.log(`Line Number: ${counts.lineNumber}, Total Count: ${counts.total}`);
      console.log(line)
      console.log(`  Literal Count: ${counts.literalCount}`);
      console.log(`  Method Call Count: ${counts.methodCallCount}`);
      console.log(`  Class Call Count: ${counts.classCallCount}`);
      console.log(`  Operator Count: ${counts.operatorCount}`);
      console.log(`  Variable Count: ${counts.variableCount}`);
      console.log(`  Method Count: ${counts.methodCount}`);
      console.log(`  Control Word Count: ${counts.controlWordCount}`);
      console.log(`  W Control Count: ${counts.W_control}`);
      console.log(`  W Inheritance Count: ${counts.W_inheritance}`);
      console.log(`  W Nesting Count: ${counts.W_nesting}`);
      console.log(`  W Total Count: ${counts.W_total}`);
      console.log(`  WC Count: ${counts.WC_Value}`);
      
    }





}

function assignLevelsToCode(controlStructures, codeLength,javaJode) {
  const lines = javaCode.split("\n");
  
  const codeLevels = Array(codeLength).fill(0);

  for (const structure of controlStructures) {
    for (let i = structure.start; i <= structure.end; i++) {
      codeLevels[i] = structure.level;
    }
  }

  const result = codeLevels.map((level, lineNumber) => ({ lineNumber, level }));
  return result;
}

// function assignLevelsToCode(controlStructures, codeLength) {
//   const codeLevels = Array(codeLength).fill(0);

//   for (const structure of controlStructures) {
//     for (let i = structure.start; i <= structure.end; i++) {
//       codeLevels[i] = structure.level;
//     }
//   }

//   return codeLevels;
// }


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
      // Push the type and the start line to the stack
      stack.push({
        type: match[1],
        start: i ,
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
            end: i ,
            level: stack.length // The level is equal to the length of the stack
          });
          stack.pop();
        }
      }
    }
  }

  // Return the result array
  return result;
}


// function findControlStatementskkkkkkkkkk(javaCode) {
//   // Initialize the result array
//   let result = [];

//   // Split the code by line breaks
//   let lines = javaCode.split(/\r?\n/);

//   // Use regular expressions to match control statements
//   let controlStatementRegex = /^\s*(if|else if|else|for|while|do|switch|case|default)\s*\(.+\)\s*\{/;

//   // Use a stack to keep track of the current control statements and their lines
//   let stack = [];

//   // Loop through the lines
//   for (let i = 0; i < lines.length; i++) {
//     // Get the current line
//     let line = lines[i];

//     // Check if the line matches a control statement
//     let match = line.match(controlStatementRegex);

//     if (match) {
//       // Push the type and the start line to the stack
//       stack.push({
//         type: match[1],
//         start: i + 1,
//       });
//     }

//     // Check if the line contains an opening brace
//     if (line.includes("{")) {
//       // Increment the brace count for the top statement on the stack
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.braces = (top.braces || 0) + 1;
//       }
//     }

//     // Check if the line contains a closing brace
//     if (line.includes("}")) {
//       // Decrement the brace count for the top statement on the stack
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.braces--;
//         // If the brace count reaches zero, pop the statement from the stack and add it to the result array
//         if (top.braces === 0) {
//           result.push({
//             type: top.type,
//             start: top.start,
//             end: i + 1,
//           });
//           stack.pop();
//         }
//       }
//     }
//   }

//   // Return the result array
//   return result;
// }






// function findControlStatements(javaCode) {
//   // Initialize the result array
//   let result = [];

//   // Split the code by line breaks
//   let lines = javaCode.split(/\r?\n/);

//   // Use regular expressions to match control statements
//   let controlStatementRegex = /^\s*(if|else if|else|for|while|do|switch|case|default)\s*\(.+\)\s*\{/;

//   // Use a stack to keep track of the current control statements and their lines
//   let stack = [];

//   // Loop through the lines
//   for (let i = 0; i < lines.length; i++) {
//     // Get the current line
//     let line = lines[i];

//     // Check if the line matches a control statement
//     let match = line.match(controlStatementRegex);

//     if (match) {
//       // Push the type and the start line to the stack
//       stack.push({
//         type: match[1],
//         start: i + 1,
//       });
//     }

//     // Check if the line contains an opening brace
//     if (line.includes("{")) {
//       // Increment the brace count for the top statement on the stack
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.braces = (top.braces || 0) + 1;
//       }
//     }

//     // Check if the line contains a closing brace
//     if (line.includes("}")) {
//       // Decrement the brace count for the top statement on the stack
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.braces--;
//         // If the brace count reaches zero, pop the statement from the stack and add it to the result array
//         if (top.braces === 0) {
//           result.push({
//             type: top.type,
//             start: top.start,
//             end: i + 1,
//           });
//           stack.pop();
//         }
//       }
//     }
//   }

//   // Return the result array
//   return result;
// }



















// function identifyControlStructures(code) {
//   const lines = code.split('\n');
//   const result = [];

//   let sequentialCount = 0;
//   let branchCount = 0;
//   let iterativeCount = 0;
//   let switchCount = 0;
//   let insideSwitch = false;

//   for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();
//       let lineResult = {
//           LineNumber: i ,
//           Sequential: 0,
//           Branch: 0,
//           Iterative: 0,
//           Switch: 0,
//       };

//       if (line.startsWith('if') || line.startsWith('else if') || line.startsWith('else')) {
//           lineResult.Branch++;
//           branchCount++;
//       } else if (line.startsWith('while') || line.startsWith('for')) {
//           lineResult.Iterative++;
//           iterativeCount++;
//       } else if (line.startsWith('switch')) {
//           lineResult.Switch++;
//           insideSwitch = true;
//           switchCount++;
//       } else if (insideSwitch && line.startsWith('case')) {
//           lineResult.Switch++;
//           switchCount++;
//       } else if (insideSwitch && line.startsWith('default:')) {
//           lineResult.Switch++;
//           switchCount++;
//       } else if (insideSwitch && line.startsWith('}')) {
//           insideSwitch = false;
//       } else {
//           lineResult.Sequential++;
//           sequentialCount++;
//       }

//       result.push(lineResult);
//   }

//   return result
// }


// async function classParser(javaCode){
//   let lines = javaCode.split(/\r?\n/);
//   var classData = [];
//   var lineLength = lines.length 

//   let selectedLines = lines.slice(0, lineLength); 

//   while(lineLength > 0){

//     var classDataResult =  findJavaClasses(selectedLines);
//     console.log(classDataResult)

//     if(classDataResult[0]==null){
//       break
//     }else{
//       var newStart = classDataResult[0].start + 1
//       var newEnd = classDataResult[0].end - 1
//       lineLength = newEnd - newStart
//       if(lineLength <= 0){
//         break
//       }else{
//         selectedLines = lines.slice(newStart, newEnd); 
//       }
//     }
//   }
// }

// function findJavaClasses(javaCode) {
//   // Initialize the result object
//   let result = []

//   // Split the code by line breaks
//   let lines = javaCode.split(/\r?\n/);

//   // Use a regular expression to match a class declaration
//   let classRegex = /^\s*(?:public|protected|private|abstract|static|final|strictfp)?\s*class\s+(\w+)\s*(?:extends\s+\w+\s*)?(?:implements\s+[\w\s,]+)?\s*\{/;

//   // Use a stack to keep track of the nested classes
//   let stack = [];

//   // Loop through the lines
//   for (let i = 0; i < lines.length; i++) {
//     // Get the current line
//     let line = lines[i];

//     // Check if the line matches a class declaration
//     let match = line.match(classRegex);

//     // If there is a match, push the class name and the declaration line to the stack
//     if (match) {
//       stack.push({
//         name: match[1],
//         start: i 
//       });
//     }

//     // Check if the line contains an opening brace
//     if (line.includes("{")) {
//       // Increment the brace count for the top class on the stack
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.braces = (top.braces || 0) + 1;
//       }
//     }

//     // Check if the line contains a closing brace
//     if (line.includes("}")) {
//       // Decrement the brace count for the top class on the stack
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.braces--;
//         // If the brace count reaches zero, pop the class from the stack and add it to the result object
//         if (top.braces === 0) {
//           result.push({
//             name: top.name,
//             start: top.start,
//             end: i 
//           });
//           stack.pop();
//         }
//       }
//     }
//   }

//   // Return the result object
//   return result;
// }



// function assignWeights(javaCode) {
//   // Initialize the result array
//   let result = [];

//   // Split the code by line breaks
//   let lines = javaCode.split(/\r?\n/);

//   // Use regular expressions to match different patterns of Java syntax
//   let classRegex = /^\s*(?:public|protected|private|abstract|static|final|strictfp)?\s*class\s+(\w+)\s*(?:extends\s+\w+\s*)?(?:implements\s+[\w\s,]+)?\s*\{/;
//   let methodRegex = /^\s*(?:public|protected|private|abstract|static|final|strictfp|synchronized)?\s*(?:\w+\s+)?(\w+)\s*\((?:[\w\s,]+)?\)\s*(?:throws\s+[\w\s,]+)?\s*\{/;
//   let blockRegex = /^\s*(?:if|else if|else|for|while|do while|switch|case|default)\s*(?:\([\w\s,]+\))?\s*\{/;
//   let commentRegex = /^\s*\/\//;

//   // Use a stack to keep track of the current nested classes and their weights
//   let stack = [];

//   // Loop through the lines
//   for (let i = 0; i < lines.length; i++) {
//     // Get the current line
//     let line = lines[i];

//     // Check if the line matches a class declaration
//     let classMatch = line.match(classRegex);

//     // If there is a match, push the class name and its weight to the stack
//     if (classMatch) {
//       stack.push({
//         name: classMatch[1],
//         weight: stack.length // The weight is equal to the length of the stack
//       });
//     }

//     // Check if the line matches a method or a block declaration
//     let methodMatch = line.match(methodRegex);
//     let blockMatch = line.match(blockRegex);

//     // If there is a match, increment the weight for the top class on the stack
//     if (methodMatch || blockMatch) {
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.weight++;
//       }
//     }

//     // Check if the line matches a comment
//     let commentMatch = line.match(commentRegex);

//     // If there is a match, do nothing
//     if (commentMatch) {
//       // Do nothing
//     } else {
//       // Add the current line and its weight to the result array
//       result.push({
//         lineNumber: i + 1,
//         weight: stack.length > 0 ? stack[stack.length - 1].weight : 0
//       });
//     }

//     // Check if the line contains an opening brace
//     if (line.includes("{")) {
//       // Increment the brace count for the top class on the stack
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.braces = (top.braces || 0) + 1;
//       }
//     }

//     // Check if the line contains a closing brace
//     if (line.includes("}")) {
//       // Decrement the brace count for the top class on the stack
//       let top = stack[stack.length - 1];
//       if (top) {
//         top.braces--;
//         // If the brace count reaches zero, pop the class from the stack and decrement its weight
//         if (top.braces === 0) {
//           top.weight--;
//           stack.pop();
//         }
//       }
//     }
//   }

//   // Return the result array
//   return result;
// }


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