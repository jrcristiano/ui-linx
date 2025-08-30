import * as fs from 'fs';
import * as path from 'path';

function removeJSXComments(content: string): string {
  const lines = content.split('\n');
  const cleanedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let hasComment = false;
    
    const singleLineCommentRegex = /\{\s*\/\*.*?\*\/\s*\}/g;
    if (singleLineCommentRegex.test(line)) {
      line = line.replace(singleLineCommentRegex, '');
      hasComment = true;
    }

    const multiLineStartRegex = /\{\s*\/\*/;
    if (multiLineStartRegex.test(line) && !line.includes('*/')) {
      hasComment = true;

      while (i < lines.length && !lines[i].includes('*/')) {
        i++;
      }

      if (i < lines.length) {
        i++;
      }
      i--;
      continue;
    }
    
    if (hasComment && line.trim() === '') {
      continue;
    }

    if (!hasComment || line.trim() !== '') {
      cleanedLines.push(line);
    }
  }
  
  return cleanedLines.join('\n');
}

function processFile(filePath: string): void {
  try {
    console.log(`Processando: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const cleanedContent = removeJSXComments(content);
    
    if (content !== cleanedContent) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`✅ Comentários removidos de: ${filePath}`);
    } else {
      console.log(`ℹ️  Nenhum comentário JSX encontrado em: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error);
  }
}

function findTsxFiles(dir: string): string[] {
  const tsxFiles: string[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
          tsxFiles.push(...findTsxFiles(fullPath));
        }
      } else if (stat.isFile() && item.endsWith('.tsx')) {
        tsxFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Erro ao ler diretório ${dir}:`, error);
  }
  
  return tsxFiles;
}

function main(): void {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Uso:');
    console.log('  npm run script -- <arquivo.tsx>           # Para um arquivo específico');
    console.log('  npm run script -- <diretório>             # Para todos os .tsx em um diretório');
    console.log('  npm run script -- .                       # Para todos os .tsx no diretório atual');
    return;
  }
  
  const target = args[0];
  
  try {
    const stat = fs.statSync(target);
    
    if (stat.isFile()) {
      if (target.endsWith('.tsx')) {
        processFile(target);
      } else {
        console.log('❌ O arquivo deve ter extensão .tsx');
      }
    } else if (stat.isDirectory()) {
      console.log(`🔍 Buscando arquivos .tsx em: ${target}`);
      const tsxFiles = findTsxFiles(target);
      
      if (tsxFiles.length === 0) {
        console.log('ℹ️  Nenhum arquivo .tsx encontrado');
        return;
      }
      
      console.log(`📁 Encontrados ${tsxFiles.length} arquivos .tsx`);
      console.log('');
      
      tsxFiles.forEach(processFile);
      
      console.log('');
      console.log(`✨ Processamento concluído! ${tsxFiles.length} arquivos verificados.`);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

main();
