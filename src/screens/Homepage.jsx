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
    var variableCounts = countVariables(code);
    var extractedMethods = extractMethods(code);
    var opCount = countOperators(code);
    var methodCallCount = countMethodCalls(code);
    var classCalls = countClassCalls(code);
    var stringnNumCount = countStringLiteralsAndNumerals(code);

    var mergedCounts = {}; // Create an object to store counts by line number

    console.log("------------------------------------------------ ");

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
                methodCount: 0, // Add a field for method count
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
                methodCount: 0, // Add a field for method count
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
                methodCount: 0, // Add a field for method count
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
                methodCount: 0, // Add a field for method count
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
                methodCount: 0, // Add a field for method count
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
                methodCount: 0, // Add a field for method count
            };
        }
        mergedCounts[lineNumber].methodCount += item.returnVal;
        mergedCounts[lineNumber].total += item.returnVal;
    });

    console.log("Merged Counts by Line Number:");
    for (const lineNumber in mergedCounts) {
        const counts = mergedCounts[lineNumber];
        console.log(`Line Number: ${counts.lineNumber}, Total Count: ${counts.total}`);
        console.log(`  Literal Count: ${counts.literalCount}`);
        console.log(`  Method Call Count: ${counts.methodCallCount}`);
        console.log(`  Class Call Count: ${counts.classCallCount}`);
        console.log(`  Operator Count: ${counts.operatorCount}`);
        console.log(`  Variable Count: ${counts.variableCount}`);
        console.log(`  Method Count: ${counts.methodCount}`);
    }
}


























//   function displayDetails(code) {

//     var variableCounts = countVariables(code);
//     var extractedMethods = extractMethods(code);
//     var opCount = countOperators(code);
//     var methodCallCount = countMethodCalls(code);
//     var classCalls = countClassCalls(code);
//     var stringnNumCount = countStringLiteralsAndNumerals(code);

//     extractedMethods.forEach(item => {
//       console.log(`Line Number: ${item.lineNumber}, Method Name : ${item.returnVal}`);
//   });

//     var mergedCounts = {}; // Create an object to store counts by line number

//     console.log("------------------------------------------------ ");

//     // Merge counts for String Literals and Numerals
//     stringnNumCount.forEach(item => {
//         const lineNumber = item.lineNumber;
//         if (!mergedCounts[lineNumber]) {
//             mergedCounts[lineNumber] = {
//                 lineNumber,
//                 total: 0,
//                 literalCount: 0,
//                 methodCallCount: 0,
//                 classCallCount: 0,
//                 operatorCount: 0,
//                 variableCount: 0,
//             };
//         }
//         mergedCounts[lineNumber].literalCount += item.count;
//         mergedCounts[lineNumber].total += item.count;
//     });

//     // Merge counts for Method Calls
//     methodCallCount.forEach(item => {
//         const lineNumber = item.lineNumber;
//         if (!mergedCounts[lineNumber]) {
//             mergedCounts[lineNumber] = {
//                 lineNumber,
//                 total: 0,
//                 literalCount: 0,
//                 methodCallCount: 0,
//                 classCallCount: 0,
//                 operatorCount: 0,
//                 variableCount: 0,
//             };
//         }
//         mergedCounts[lineNumber].methodCallCount += item.dotCount;
//         mergedCounts[lineNumber].total += item.dotCount;
//     });

//     // Merge counts for Class Calls
//     classCalls.forEach(item => {
//         const lineNumber = item.lineNumber;
//         if (!mergedCounts[lineNumber]) {
//             mergedCounts[lineNumber] = {
//                 lineNumber,
//                 total: 0,
//                 literalCount: 0,
//                 methodCallCount: 0,
//                 classCallCount: 0,
//                 operatorCount: 0,
//                 variableCount: 0,
//             };
//         }
//         mergedCounts[lineNumber].classCallCount += item.methodCall;
//         mergedCounts[lineNumber].total += item.methodCall;
//     });

//     // Merge counts for Operators
//     opCount.forEach(item => {
//         const lineNumber = item.lineNumber;
//         if (!mergedCounts[lineNumber]) {
//             mergedCounts[lineNumber] = {
//                 lineNumber,
//                 total: 0,
//                 literalCount: 0,
//                 methodCallCount: 0,
//                 classCallCount: 0,
//                 operatorCount: 0,
//                 variableCount: 0,
//             };
//         }
//         mergedCounts[lineNumber].operatorCount += item.numberOfOperators;
//         mergedCounts[lineNumber].total += item.numberOfOperators;
//     });

//     // Merge counts for Variables
//     variableCounts.forEach(item => {
//         const lineNumber = item.lineNumber;
//         if (!mergedCounts[lineNumber]) {
//             mergedCounts[lineNumber] = {
//                 lineNumber,
//                 total: 0,
//                 literalCount: 0,
//                 methodCallCount: 0,
//                 classCallCount: 0,
//                 operatorCount: 0,
//                 variableCount: 0,
//             };
//         }
//         mergedCounts[lineNumber].variableCount += item.varCount;
//         mergedCounts[lineNumber].total += item.varCount;
//     });

//     console.log("Merged Counts by Line Number:");
//     for (const lineNumber in mergedCounts) {
//         const counts = mergedCounts[lineNumber];
//         console.log(`Line Number: ${counts.lineNumber}, Total Count: ${counts.total}`);
//         console.log(`  Literal Count: ${counts.literalCount}`);
//         console.log(`  Method Call Count: ${counts.methodCallCount}`);
//         console.log(`  Class Call Count: ${counts.classCallCount}`);
//         console.log(`  Operator Count: ${counts.operatorCount}`);
//         console.log(`  Variable Count: ${counts.variableCount}`);
//     }

   
        
// }






















  function countStringLiteralsAndNumerals(javaCode) {
    const codeLines = javaCode.split('\n');
    const stringLiteralsAndNumeralsCount = [];
  
    for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
      const line = codeLines[lineNumber];
      const regexPattern = /("[^"]*")|('[^']*')|(\b\d+(\.\d+)?\b)/g; // Updated pattern
  
      const matches = line.match(regexPattern) || [];
     
      stringLiteralsAndNumeralsCount.push({
        lineNumber: lineNumber ,
        count: matches.length,
      });
    }
   // console.log(stringLiteralsAndNumeralsCount)
    return stringLiteralsAndNumeralsCount;
  }

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
                dotCount = dotMatches.length;
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
function countStringLiterals(javaCode) {
  const codeLines = javaCode.split('\n');
  const stringLiteralsCount = [];

  for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
    const line = codeLines[lineNumber];
    const regexPattern = /("[^"]*")|('[^']*')/g;
    const matches = line.match(regexPattern) || [];

    stringLiteralsCount.push({
      lineNumber: lineNumber , // Adding 1 to match typical line numbering
      count: matches.length,
    });
  }

  return stringLiteralsCount;
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