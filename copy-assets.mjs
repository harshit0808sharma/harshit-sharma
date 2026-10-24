import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\aadeefb2-f647-4963-be1e-19c528488968';
const destDir = 'c:\\Lokaci Projects\\testing\\testing\\public\\assets';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(
  path.join(srcDir, 'jungle_wooden_log_1792587374743.jpg'),
  path.join(destDir, 'wooden_log.jpg')
);

fs.copyFileSync(
  path.join(srcDir, 'green_jungle_snake_1792587394261.jpg'),
  path.join(destDir, 'green_snake.jpg')
);

fs.copyFileSync(
  path.join(srcDir, 'hanging_jungle_vine_1792587431517.jpg'),
  path.join(destDir, 'hanging_vine.jpg')
);

console.log('Jungle assets copied successfully to public/assets');
