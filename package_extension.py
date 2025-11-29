import os
import zipfile
from pathlib import Path

def package_extension():
    # 定义扩展根目录
    root_dir = Path('.')
    
    # 定义要包含在扩展包中的文件和目录
    include_list = [
        'manifest.json',
        'popup.html',
        'popup.css',
        'background.js',
        '_locales',
        'icons',
        'css',
        'js'
    ]
    
    # 创建 zip 文件
    with zipfile.ZipFile('cookie-exporter-extension.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in include_list:
            item_path = root_dir / item
            if item_path.exists():
                if item_path.is_dir():
                    # 如果是目录，则递归添加所有文件
                    for file_path in item_path.rglob('*'):
                        if file_path.is_file():
                            # 计算在zip中的相对路径
                            arc_name = file_path.relative_to(root_dir)
                            zipf.write(file_path, arc_name)
                            print(f'Added: {arc_name}')
                else:
                    # 如果是文件，直接添加
                    zipf.write(item_path, item)
                    print(f'Added: {item}')
            else:
                print(f'Warning: {item} not found')
    
    print('Extension packaged successfully!')

if __name__ == '__main__':
    package_extension()