import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-dracula';
import { Button } from '@mui/material';
import '../CSS/home.css'
import { PDFDocument, rgb } from 'pdf-lib';
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
  const [totICB,setTotICB] = useState('')


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
  //imandi
  async function displayDetails(code) { 

      const lines = code.split("\n")
      var variableCounts = countVariables(code)
      var extractedMethods = extractMethods(code)
      var opCount = countOperators(code)
      var methodCallCount = countMethodCalls(code)
      var classDetails = findClasses(code)
      var threadDetails = threadidentifier(countClassCalls(code),classDetails )
      var stringnNumCount = countStringLiteralsAndNumerals(code)
      var controlWordCount = countControlWords(code)
      var controlStatments  = findControlStatements(code).sort ( (a,b) => a.start - b.start)
      var assingLevel = assignLevelsToCode(controlStatments,code)
      var inheritnceData = assignInheritanceLevelsToCode(classDetails, code)
      const tableData = []
      var mergedCounts = {}
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

      threadDetails.forEach(item => {
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

          mergedCounts[lineNumber].classCallCount += item.value;
          mergedCounts[lineNumber].total += item.value;
      
    });

      // Merge counts for Operators -----------------------------------------------------------------------------------------------------------------------
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
          mergedCounts[lineNumber].W_control += item.wc
          mergedCounts[lineNumber].W_total += item.wc
      });

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

   await new Promise(resolve => {
    setTimeout(() => {
      identifyRecursiveMethods(code,tableData);
      resolve();
    }, 0);
  })

  
  }

  //chalitha
  function identifyRecursiveMethods(javaCode,tableData) {
    const result = [];
    
    // Split the code into lines
    const lines = javaCode.split(/\r?\n/);
  
    // Regular expression to match method definitions
    const methodDefinitionRegex = /^\s*(public|private|protected)?\s*\w+\s+(\w+)\s*\([^\)]*\)\s*\{/;
  
    // Loop through the lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
  
      // Check if the line matches a method definition
      const methodMatch = line.match(methodDefinitionRegex);
  
      if (methodMatch) {
        const methodName = methodMatch[2];
        const methodNameWithParentheses = methodName + "\\(";
  
        // Check if the method name is used within the method body
        const methodBody = lines.slice(i + 1).join("\n");
        
        // Use a regular expression to find potential recursive calls
        const recursiveCallRegex = new RegExp(`${methodNameWithParentheses}[^;]*;`, 'g');
        const recursiveCalls = methodBody.match(recursiveCallRegex);
  
        // If potential recursive calls are found, determine the end line
        if (recursiveCalls && recursiveCalls.length > 1) {
          let braceCount = 1;
          let endLine = i + 1;
  
          // Loop through lines to count opening and closing curly braces
          for (let j = i + 1; j < lines.length; j++) {
            const innerLine = lines[j];
            endLine = j + 1; // Update the end line
  
            // Count opening curly braces
            if (innerLine.includes("{")) {
              braceCount++;
            }
  
            // Count closing curly braces
            if (innerLine.includes("}")) {
              braceCount--;
            }
  
            // If the closing curly brace matches the opening curly brace count, it's the end of the method
            if (braceCount === 0) {
              break;
            }
          }
  
          result.push({
            methodName: methodName,
            startLine: i + 1,
            endLine: endLine
          });
        }
      }
    }

    var extras = 0;

    result.forEach(recFunc=>{
  
      for (let lineNumber = recFunc.startLine+1; lineNumber <= recFunc.endLine; lineNumber++) {
      
        const rowData = tableData[lineNumber - 1]; 
        var wTot =  parseInt(rowData.W_Total) 
        var sTot =  parseInt(rowData.S_Count)
        var tot =  wTot * sTot
        extras += tot
    
      }
    })


   setTotICB(extras)
   setResultData(tableData);
   generatePDF(tableData)
 
  }
  //ashvini
  async function generatePDF(tableData) {
    if (resultData != null) {
      const pdfDoc = await PDFDocument.create();
      const marginX = 50;
      const marginY = 100;
      let maxLineLength = 0; // Track the maximum length of the first column
  
      // Calculate the maximum length of the first column (Line)
      tableData.forEach((row) => {
        const lineLength = row.Line.toString().length;
        maxLineLength = Math.max(maxLineLength, lineLength);
      });
  
      // Calculate the required page width based on the maximum length of the first column
      const pageWidth =2000
      
      // Calculate the required page height based on the number of rows in tableData
      const numDataRows = tableData.length;
      const pageHeight = marginY + numDataRows * 24 + marginY; // Adjust the factor based on row height
  
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
  
      // Define padding for table cells
      const cellPaddingX = 5;
      const cellPaddingY = 2;
  
      // Define table settings
      const numColumns = 7;
      const columnWidth = (pageWidth - 2 * marginX) / numColumns;
  
      const drawTable = (x, y, data) => {
        const tableX = x + cellPaddingX;
        const tableY = y - cellPaddingY;
        const cellWidth = columnWidth;
        const cellHeight = 24; // Adjust the row height
        const borderWidth = 1;
  
        // Draw table header
        page.drawRectangle({
          x: tableX,
          y: tableY,
          width: cellWidth * numColumns,
          height: cellHeight,
          color: rgb(1, 1, 1),
          borderWidth: borderWidth,
        });
  
        for (let i = 0; i < numColumns; i++) {
          const cellX = tableX + i * cellWidth;
          const cellText = data[0][i].toString();
          page.drawText(cellText, {
            x: cellX + cellPaddingX,
            y: tableY - cellPaddingY + 5,
            size: 14,
            color: rgb(0, 0, 0),
          });
        }
  
        // Draw table data
        for (let i = 1; i < data.length; i++) {
          const rowData = data[i];
          for (let j = 0; j < numColumns; j++) {
            const cellX = tableX + j * cellWidth;
            const cellY = tableY - i * cellHeight;
            const cellText = rowData[j].toString();
            page.drawRectangle({
              x: cellX,
              y: cellY,
              width: cellWidth,
              height: cellHeight,
              color: rgb(1, 1, 1),
              borderWidth: borderWidth,
            });
            page.drawText(cellText, {
              x: cellX + cellPaddingX,
              y: cellY - cellPaddingY + 5,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }
        }
      };
      var tot = parseInt(totalWCCount) + (totICB)
  
      // Define the table header
      const headerRow = [
        'Code Line',
        'Number of Tokens',
        'W c Value',
        'W i Value',
        'W n Value',
        'W Total',
        'WC Count',
      ];

      page.drawText(`Total (tot): ${tot}`, {
        x: marginX,
        y: marginY,
        size: 14,
        color: rgb(0, 0, 0),
      });
  
    

      // Combine header and data
      const table = [headerRow, ...tableData.map((row) => Object.values(row))];
  
      // Draw the table
      drawTable(marginX, pageHeight - marginY, table);

      page.drawText('Coderlyzer ICB Value Report     ', {
        x: marginX, // Adjust the X position as needed
        y: pageHeight - marginY + 40, // Adjust the Y position as needed
        size: 16, // Adjust the font size as needed
        color: rgb(0, 0, 0), // Adjust the text color as needed
      });


      page.drawText(`Total ICB Value is ${tot}`, {
        x: marginX,
        y: marginY- 25,
        size: 14,
        color: rgb(0, 0, 0),
      });
  
  
      // Serialize the PDF document to bytes
      const pdfBytes = await pdfDoc.save();
  
 
      downloadGenerator(pdfBytes);
      //return pdfBytes;
    }
  }
  //ashvini
  function downloadGenerator(pdfBytes){
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a download link and trigger the download
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    const formattedTime = currentTime.replace(/:/g, '-');



    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(pdfBlob);
    a.download = `CoderlyzerReport_${currentTime}.pdf`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  }

  //ashvini
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
  
    //console.log(methodInfo);
    return methodInfo;
  }
  
  //isuru
  function threadidentifier(classCalls, classData){

    const threadData = [];

    var isThread = classData[0].isClassaThread
    var className = classData[0].className

    classCalls.forEach(item => {
  
      if(item.classCall ==="Thread"){
        threadData.push({lineNumber:item.lineNumber ,value : 6})
      }else if(className == item.classCall && isThread){ 
        threadData.push({lineNumber:item.lineNumber ,value : 6})
      }else{
        threadData.push({lineNumber:item.lineNumber ,value : 4})
      }
    })

    return threadData
  }
  //chalitha
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
  //chalitha
  function findClasses(javaCode) {
    // Initialize the result array
    let result = [];
    var isClassaThread = false;
  
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
              // Extract the class name
              let className = match[2];
  
              // Check if the class implements Runnable
              let implementsRunnable = (match[6] || '').includes('Runnable');
  
              result.push({
                className: className,
                start: i,
                end: j,
                wi: wi, // Set the wi attribute for the class
                isClassaThread: implementsRunnable // Set isClassaThread based on implements Runnable
              });
  
              wi++; // Increment wi for the next class
              break;
            }
          }
        } else {
          // If the class declaration does not have an opening brace on the same line,
          // it's a single-line class declaration
          // Extract the class name
          let className = match[2];
  
          // Check if the class implements Runnable
          let implementsRunnable = (match[6] || '').includes('Runnable');
  
          result.push({
            className: className,
            start: i,
            end: i,
            wi: wi, // Set the wi attribute for the class
            isClassaThread: implementsRunnable // Set isClassaThread based on implements Runnable
          });
  
          wi++; // Increment wi for the next class
        }
      }
    }
  
   // console.log(result);
    return result;
  }
  //isuru
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
  //isuru
  function findControlStatements(javaCode) {
    // Initialize the result array
    let result = [];

    // Split the code by line breaks
    let lines = javaCode.split(/\r?\n/);

    // Use regular expressions to match control statements
    let controlStatementRegex = /^\s*(if|try|else if|else|for|while|do|switch|case|default|catch)\s*\(.+\)\s*\{/;

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
        }else if (match[1] === "catch"){
          wc = 1;
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

   // console.log(result)
    return result;
  }

  //imandi
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

  //ashvini
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
                  if(wordAfterDot==="start"){
                    dotCount = 5
                  }else{
                    dotCount =3;
                  }
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
//imandi
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
          lineNumber: lineNumber , 
          classCall: classCall,
        });
      }
    }
  
    //console.log(classCalls);
    return classCalls;
  }
  
  //isuru
  function countControlWords(javaCode) {
    const codeLines = javaCode.split('\n');
    const controlKeywords = /(if|else if|for|throw|while|catch|do while|switch\()/g;
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
  //chalitha
  function countOperators(javaCode) {
    const codeLines = javaCode.split('\n');
    var opCount = [];
    const regexPattern = /[!=<>+\-*/%&|^~]+/g;
  
    for (let lineNumber = 0; lineNumber < codeLines.length; lineNumber++) {
      var wc = 0;
      const line = codeLines[lineNumber];
  
      const operators = line.match(regexPattern) || [];
      let numberOfOperators = operators.length;
  
      // Check for && and || and increase wc if found
      const matches = line.match(/&&|\|\|/g);
      if (matches) {
        wc += matches.length;
      }
  
      const matchesNegativeNumbers = line.match(/-\d+/g);
      if (matchesNegativeNumbers) {
        numberOfOperators -= matchesNegativeNumbers.length;
      }
  
      opCount.push({ lineNumber, numberOfOperators, wc });
    }
  
   // console.log(opCount);
    return opCount;
  }

  //imandi
  function countVariables(javaCode) {

    const variableDeclarationRegex = /\b(?:int|double|float|char|String)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:=|\b)(?!args\b)/g;
    let variableCounts = [];
    var variableNamesArray = [];
    const variableDeclarations = javaCode.match(variableDeclarationRegex) || [];
    const variableUsageRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
   // const variableUsages = javaCode.match(variableUsageRegex) || [];

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
      //const nextWordAfterCurrent = [];

      for (let word of variableUsageMatches) {
        
        variableNamesArray.forEach((name) => {
          if (name !== "args") {
            if (word === name ) {
              if ( previousWord === "int" || previousWord === "double" || previousWord === "float" || previousWord === "char" || previousWord === "String"){
               // const nextIndex = variableUsageMatches.indexOf(word) + 1;
               // var nextWord = variableUsageMatches[nextIndex]
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
  

  function clearAll(e){
    setResultData(null)
    setCode("")
    setTotICB("")
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
        Calculate ICB 
    </Button>


    <Button variant="contained" color="error" 
        onClick={(e)=>clearAll(e)}
        style={{margin:"10px"}}
        >
        Clear All
    </Button>


    {/* <Button variant="contained" color="error" 
       onClick={(e)=>generatePDF(e)}
        style={{margin:"10px"}}
        >
        Get PDF
    </Button> */}

      </div>

      <div className="code-output" style={{overflowY:"auto"}}>
      
          <table >
            <tbody>
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
            
              <td colSpan={6}>ICB value is </td>
              <td style={{textAlign:"center"}}> {parseInt(totalWCCount) + (totICB)}</td> 
            
            </tr>
            </tbody>
          </table>
      </div>
      {/* <label htmlFor="">{totalWCCount}</label> */}
    </div>

<Footer/>
  </>
)
}
export default Home;