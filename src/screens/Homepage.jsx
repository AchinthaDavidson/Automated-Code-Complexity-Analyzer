import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-dracula';
import { Button } from '@mui/material';
import '../CSS/home.css'

import Header from'../Component/Header'
import Footer from'../Component/Footer' 
//const JavaParser = require('java-parser');

function Home() {
  const [codeLines, setCodeLines] = useState([]);
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cbtot,setCbtot] = useState("")
  const [cw,setcw] = useState();
  const [code, setCode] = useState('');
  const [resultData, setResultData] = useState([])
 
  var wccCount = 0;
  var totalWCCount = 0;
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
      var controlStatments  = findControlStatements(code)
      controlStatments.sort ( (a,b) => a.start - b.start);
      var assingLevel = assignLevelsToCode(controlStatments,code)
      var classData = findClasses(code);
      var inheritnceData = assignInheritanceLevelsToCode(classData, code)
      const tableData = [];
      var mergedCounts = {};
       // Create an object to store counts by line number
    
      // Merge counts for String Literals and Numerals-----------------------------------------------------------------------------------------------
      var stntcount = 0
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
          stntcount +=  item.count;
          mergedCounts[lineNumber].literalCount += item.count;
          mergedCounts[lineNumber].total += item.count;
      });

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


     // Merge counts for Class Calls-------------------------------------------------------------------------------------------------------------------------
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

      // Merge counts for Operators -----------------------------------------------------------------------------------------------------------------------
      var ops = 0
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
          ops +=  item.numberOfOperators;
          mergedCounts[lineNumber].operatorCount += item.numberOfOperators;
          mergedCounts[lineNumber].total += item.numberOfOperators;
     
      });
   //   console.log("Operator Count ", ops)

     var varcount = 0
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
          varcount +=  item.varCount;
          mergedCounts[lineNumber].variableCount += item.varCount;
          mergedCounts[lineNumber].total += item.varCount;
        
      });
    //  console.log("Variable  Count ",varcount)

      // Merge counts for Extracted Methods
      var methodcounts = 0
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
          methodcounts +=  item.returnVal;
          mergedCounts[lineNumber].methodCount += item.returnVal;
          mergedCounts[lineNumber].total += item.returnVal;
      });

     // console.log("Method Count ",methodcounts)

      //control word cpunt ---------------------------------------------------------------------------------------------------------
      var controlwordcount = 0
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
        controlwordcount +=  item.count;
        mergedCounts[lineNumber].controlWordCount += item.count;
        mergedCounts[lineNumber].total += item.count;
       
      });
     // console.log("Control word Count ", controlwordcount)

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

    
    inheritnceData.forEach(item => {
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
      mergedCounts[lineNumber].W_inheritance += item.wi;
      mergedCounts[lineNumber].W_total += item.wi;
  });
   
    for (const lineNumber in mergedCounts) {
      const counts = mergedCounts[lineNumber];
      var codeString = lines[counts.lineNumber].replace(/\t/g, '    ').replace(/\r/g, '');
      wccCount +=  counts.W_total * counts.total
      const lineData = {
        'Line': codeString,
        'S_Count': counts.total,
        'W_Control': counts.W_control,
        'W_Inheritance': counts.W_inheritance,
        'W_Nesting': counts.W_nesting,
        'W_Total': counts.W_total,
        'WC_Count': counts.W_total * counts.total
      };
      tableData.push(lineData);
    }

  //  console.table(tableData);
   // setCbtot(wccCount);
    setResultData(tableData);
    //console.log("WCC Value for the given code is :  " + wccCount)

  }

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
                if(wordAfterDot==="out"){
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



  function countClassCalls(javaCode) {
    const codeLines = javaCode.split('\n');
    const classCalls = [];
  
    const regexPattern = /\bnew\s+([\w$]+)\s*\([^)]*\)/g;
  
    for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
      const line = codeLines[lineNumber];
      let match;
  
      while ((match = regexPattern.exec(line)) !== null) {
        const classCall = match[1];
        classCalls.push({
          lineNumber: lineNumber , // Adding 1 to match typical line numbering
          classCall: classCall,
        });
      }
    }
  
    //console.log(classCalls);
    return classCalls;
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
   // console.log(controlKeywordsCount)
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
   //console.log(variableCounts)
    return variableCounts;
  }
  
  function extractMethods(javaCode) {
    const methodDeclarationRegex = /(public\s+static\s+void\s+main\s*\(.*\))|((public|private|protected|static|final)?\s+\w+\s+\w+\s*\([^)]*\)\s*(throws\s+\w+(?:,\s*\w+)*)?\s*{)/g;
    const methodDeclarations = javaCode.match(methodDeclarationRegex) || [];
    const methodInfo = [];
    const lines = javaCode.split("\n");
  
    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber];
      const methodDeclarationMatch = line.match(/(public\s+static\s+void\s+main\s*\(.*\))|((public|private|protected|static|final)?\s+\w+\s+\w+\s*\([^)]*\)\s*(throws\s+\w+(?:,\s*\w+)*)?\s*{)/);
      
      let returnVal = 0
  
      if (methodDeclarationMatch) {
        if (line.includes("public static void main")){
          returnVal = 4
        }else{
          returnVal = 2
        }
      } 

      methodInfo.push({ lineNumber, returnVal });
    }
  
    console.log(methodInfo);
    return methodInfo;
  }
  

  

  function clearAll(e){
    setResultData(null)
    setCode("")

  }

return (
  <>
  <Header/>
   <div className="code-container">
      <div className="code-input">
      <Button
      variant="outlined"
      component="label"
      color='secondary'
      style={{ margin:"10px"}}
    >
      Upload File
      <input
        type="file"
        hidden
        accept=".txt,.js,.java" // Add accepted file types here
        onChange={handleFileChange}
      />
    </Button>

      <AceEditor
        mode="javascript" // Change to the desired language mode
        theme="dracula" // Change to the desired theme
        value={code}
        onChange={handleCodeChange}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={true}
        style={{width:"95%"}}
       
      
    />

    <Button variant="contained" color="success" 
        onClick={()=>displayDetails(code)}
        style={{margin:"10px"}}
        >
        Calculate CB Value
    </Button>


    <Button variant="contained" color="error" 
        onClick={(e)=>clearAll(e)}
        style={{margin:"10px"}}
        >
        Clear All
    </Button>

      </div>

      <div className="code-output" style={{overflowY:"auto"}}>
      
          <table >
          <tr>
              <th>Line </th>
              <th>S Count</th>
              <th>W Control Structure</th>
              <th>W Inheritance</th>
              <th>W Nesting</th>
              <th>W Total</th>
              <th>WC Count</th>
            </tr>

            {resultData !== null && resultData.length > 0 ? (
            	resultData.map((item,index) => {
            // Calculate running total of WC_Count
              totalWCCount += item.WC_Count;

              return (
                <tr key={index}> 
                  <td> {item.Line} </td>
                  <td style={{textAlign:"center"}}> {item.S_Count} </td>
                  <td style={{textAlign:"center"}}> {item.W_Control} </td>
                  <td style={{textAlign:"center"}}> {item.W_Inheritance} </td>
                  <td style={{textAlign:"center"}}> {item.W_Nesting} </td>
                  <td style={{textAlign:"center"}}> {item.W_Total} </td>
                  <td style={{textAlign:"center"}}> {item.WC_Count} </td>
                </tr>
              );
            })
            ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}

            <tr  style={{background:"pink"}}>   
            
              <td colSpan={6}>CB value is </td>
              <td style={{textAlign:"center"}}> {totalWCCount}</td> 
            
            </tr>
          </table>
      </div>
      {/* <label htmlFor="">{totalWCCount}</label> */}
    </div>

<Footer/>
  </>
)
}
export default Home;