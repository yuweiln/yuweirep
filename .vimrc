set nu
syntax enable
syntax on
set background=dark
colorscheme darkblue

set nocompatible              " required
filetype on                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')
" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" Plugins
" Plugin 'Valloric/YouCompleteMe'
""Plugin 'scrooloose/syntastic'
" Plugin 'bling/vim-airline'
""Plugin 'SirVer/ultisnips'
""Plugin 'ceaser/vim-matchit'
""Plugin 'elzr/vim-json'
""Plugin 'honza/vim-snippets'
""Plugin 'justinmk/vim-sneak'
Plugin 'kien/ctrlp.vim'
let g:ctrlp_working_path_mode = 'ra'
set wildignore+=*/tmp/*,*/node_modules/*,*.so,*.swp,*.zip
let g:ctrlp_custom_ignore = {'dir':  '\v[\/]\.(git|hg|svn)$', 'file': '\v\.(exe|so|dll)$'}

""Plugin 'ludovicchabant/vim-lawrencium'
""Plugin 'majutsushi/tagbar'
""Plugin 'mhinz/vim-signify'
Plugin 'plasticboy/vim-markdown'
""Plugin 'scrooloose/nerdcommenter'
""Plugin 'sjl/gundo.vim'
""Plugin 'tpope/vim-fugitive'
""Plugin 'tpope/vim-sleuth'
""Plugin 'tpope/vim-surround'
""Plugin 'tyru/open-browser.vim'
""Plugin 'vim-scripts/a.vim'


let mapleader=","

Plugin 'taglist.vim'

""if has("cscope")
""set csprg=/usr/local/bin/cscope
""set csto=0
""set cst
""set nocsverb
"add any database in current directory
""if filereadable("cscope.out")
""cs add cscope.out
" else add database pointed to by environment
""elseif $CSCOPE_DB != 
""
""cs add $CSCOPE_DB
""endif
""set csverb
""endif


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" cscope setting
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
if has("cscope")
    set csprg=/usr/bin/cscope
    set csto=1
    set cst
    set nocsverb
    " add any database in current directory
    if filereadable("cscope.out")
        cs add cscope.out
    endif
    set csverb
endif
 
 

nmap <C-\>s :cs find s <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>g :cs find g <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>c :cs find c <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>t :cs find t <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>e :cs find e <C-R>=expand("<cword>")<CR><CR>
nmap <C-\>f :cs find f <C-R>=expand("<cfile>")<CR><CR>
nmap <C-\>i :cs find i ^<C-R>=expand("<cfile>")<CR>$<CR>
nmap <C-\>d :cs find d <C-R>=expand("<cword>")<CR><CR>


Plugin 'iamcco/markdown-preview.vim'

" 撤销
Plugin 'mbbill/undotree'
"undotree
nnoremap <F6> :UndotreeToggle<cr>
set undodir=~/.undodir/
set undofile

" C++语法高亮
Plugin 'octol/vim-cpp-enhanced-highlight'
"cpp-enhanced-highlight
"高亮类，成员函数，标准库和模板
let g:cpp_class_scope_highlight = 1
let g:cpp_member_variable_highlight = 1
let g:cpp_concepts_highlight = 1
let g:cpp_experimental_simple_template_highlight = 1
 "文件较大时使用下面的设置高亮模板速度较快，但会有一些小错误
"let g:cpp_experimental_template_highlight = 1
"

" 关灯看小说
Plugin 'junegunn/limelight.vim'
Plugin 'junegunn/goyo.vim'
"limelight
"<Leader>l触发limelight功能
nmap <Leader>l :Goyo<CR>
xmap <Leader>l :Goyo<CR>
"进入goyo模式后自动触发limelight,退出后则关闭
autocmd! User GoyoEnter Limelight
autocmd! User GoyoLeave Limelight!


" 括号美化
Plugin 'luochen1990/rainbow'
"rainbow
let g:rainbow_active = 1
let g:rainbow_conf = {
\   'guifgs': ['royalblue3', 'darkorange3', 'seagreen3', 'firebrick'],
\   'ctermfgs': ['lightblue', 'lightyellow', 'lightcyan', 'lightmagenta'],
\   'operators': '_,_',
\   'parentheses': ['start=/(/ end=/)/ fold', 'start=/\[/ end=/\]/ fold', 'start=/{/ end=/}/ fold'],
\   'separately': {
\       '*': {},
\       'tex': {
\           'parentheses': ['start=/(/ end=/)/', 'start=/\[/ end=/\]/'],
\       },
\       'lisp': {
\           'guifgs': ['royalblue3', 'darkorange3', 'seagreen3', 'firebrick', 'darkorchid3'],
\       },
\       'vim': {
\           'parentheses': ['start=/(/ end=/)/', 'start=/\[/ end=/\]/', 'start=/{/ end=/}/ fold', 'start=/(/ end=/)/ containedin=vimFuncBody', 'start=/\[/ end=/\]/ containedin=vimFuncBody', 'start=/{/ end=/}/ fold containedin=vimFuncBody'],
\       },
\       'html': {
\           'parentheses': ['start=/\v\<((area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)[ >])@!\z([-_:a-zA-Z0-9]+)(\s+[-_:a-zA-Z0-9]+(\=("[^"]*"|'."'".'[^'."'".']*'."'".'|[^ '."'".'"><=`]*))?)*\>/ end=#</\z1># fold'],
\       },
\       'css': 0,
\   }
\}



Plugin 'mileszs/ack.vim'
"ack
"<F4>进行搜索，同时不自动打开第一个匹配的文件"
map <F4> :Ack!<Space>
"调用rg进行搜索
if executable('rg')
  let g:ackprg = 'rg --vimgrep'
endif
"高亮搜索关键词
let g:ackhighlight = 1
"修改快速预览窗口高度为15
let g:ack_qhandler = "botright copen 15"
"在QuickFix窗口使用快捷键以后，自动关闭QuickFix窗口
let g:ack_autoclose = 1
"使用ack的空白搜索，即不添加任何参数时对光标下的单词进行搜索，默认值为1，表示开启，置0以后使用空白搜索将返回错误信息
let g:ack_use_cword_for_empty_search = 1
"部分功能受限，但对于大项目搜索速度较慢时可以尝试开启
"let g:ack_use_dispatch = 1
"

" 界面
Plugin 'mhinz/vim-startify'
"设置书签
let g:startify_bookmarks            = [
            \ '~/Project/test.cpp',
            \]
"起始页显示的列表长度
let g:startify_files_number = 20
"自动加载session
let g:startify_session_autoload = 1
"过滤列表，支持正则表达式
let g:startify_skiplist = [
       \ '^/tmp',
       \ ]
"自定义Header和Footer
let g:startify_custom_header = [
            \ '+------------------------------+',
            \ '|                              |',
            \ '|    Still waters run deep!    |',
            \ '|                              |',
            \ '+----------------+-------------+',
            \]
let g:startify_custom_footer = [
            \ '+------------------------------+',
            \ '|     Keep an open mind!       |',
            \ '+----------------+-------------+',
            \]


" 代码检测
Plugin 'w0rp/ale'
"ale
"始终开启标志列
let g:ale_sign_column_always = 1
let g:ale_set_highlights = 0
"自定义error和warning图标
let g:ale_sign_error = '✗'
let g:ale_sign_warning = '⚡'
"在vim自带的状态栏中整合ale
let g:ale_statusline_format = ['✗ %d', '⚡ %d', '✔ OK']
"显示Linter名称,出错或警告等相关信息
let g:ale_echo_msg_error_str = 'E'
let g:ale_echo_msg_warning_str = 'W'
let g:ale_echo_msg_format = '[%linter%] %s [%severity%]'
"普通模式下，sp前往上一个错误或警告，sn前往下一个错误或警告
nmap sp <Plug>(ale_previous_wrap)
nmap sn <Plug>(ale_next_wrap)
"<Leader>s触发/关闭语法检查
nmap <Leader>s :ALEToggle<CR>
"<Leader>d查看错误或警告的详细信息
nmap <Leader>d :ALEDetail<CR>

"文件内容发生变化时不进行检查
let g:ale_lint_on_text_changed = 'never'
"打开文件时不进行检查
let g:ale_lint_on_enter = 0

set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [POS=%l,%v][%p%%]\ %{strftime(\"%d/%m/%y\ -\ %H:%M\")}\ %{ALEGetStatusLine()}



Plugin 'scrooloose/nerdtree'
map <F2> :NERDTreeToggle<CR>
let NERDTreeShowLineNumbers=1
let NERDTreeAutoCenter=1
let NERDTreeShowHidden=1
let NERDTreeWinSize=30
let g:nerdtree_tabs_open_on_console_startup=1
let NERDTreeIgnore=['\.pyc','\~$','\.swp']
let NERDTreeShowBookmarks=1
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

let NERDTreeHighlightCursorline = 1       " 高亮当前行
let NERDTreeShowLineNumbers     = 1       " 显示行号




Plugin 'vim-airline/vim-airline'
"vim-airline配置:优化vim界面"
"let g:airline#extensions#tabline#enabled = 1
" airline设置
" 显示颜色
""set t_Co=256
set laststatus=2
" 使用powerline打过补丁的字体
let g:airline_powerline_fonts = 1
"m，d，y，H，M分别表示月，日，年，时，分，也就是相应英文的首字母
let g:airline_section_b = '%{strftime("%m/%d/%y - %H:%M")}'

" 开启tabline
let g:airline#extensions#tabline#enabled = 1
" tabline中当前buffer两端的分隔字符
let g:airline#extensions#tabline#left_sep = ' '
" tabline中未激活buffer两端的分隔字符
let g:airline#extensions#tabline#left_alt_sep = ' '
" tabline中buffer显示编号
let g:airline#extensions#tabline#buffer_nr_show = 1
let g:airline#extensions#tabline#fnamemod = ':t'
" 映射切换buffer的键位
nnoremap [b :bp<CR>
nnoremap ]b :bn<CR>
" 映射<leader>num到num buffer
let g:mapleader = ","
map <leader>1 :b 1<CR>
map <leader>2 :b 2<CR>
map <leader>3 :b 3<CR>
map <leader>4 :b 4<CR>
map <leader>5 :b 5<CR>
map <leader>6 :b 6<CR>
map <leader>7 :b 7<CR>
map <leader>8 :b 8<CR>
map <leader>9 :b 9<CR>

" vim-scripts 中的插件 "
Plugin 'majutsushi/tagbar'
"ctags 配置:F3快捷键显示程序中的各种tags，包括变量和函数等。
map <F3> :TagbarToggle<CR>
"let g:tagbar_ctags_bin='/usr/bin/ctags'
let g:tagbar_ctags_bin='/Users/yuwei/.vim/ctags/bin/ctags'
let g:tagbar_width=26
nnoremap <Leader>y :TagbarToggle<CR>

let g:tagbar_autofocus=1

map <F4> :!/Users/yuwei/.vim/ctags/bin/ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR><CR> :TlistUpdate<CR>
imap <F4> <ESC>:!/Users/yuwei/.vim/ctags/bin/ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR><CR> :TlistUpdate<CR>
set tags=tags
set tags+=./tags " 表示在当前工作目录下搜索tags文件
set tags+=$MCODE/tags "表示在搜寻tags文件的时候，也要搜寻MCODE文件夹下的tags文件，在ctags -R 生成tags文件后，不要将tags移动到别的目录，否则ctrl+］时，会提示找不到源码文件)



"Plugin 'The-NERD-tree'
"NERDTree 配置:F2快捷键显示当前目录树
"map <F2> :NERDTreeToggle<CR>
"let NERDTreeWinSize=25

Plugin 'Yggdroot/indentLine'

Plugin 'Raimondi/delimitMate'

Plugin 'scrooloose/nerdcommenter'
" 注释加空格
let g:NERDSpaceDelims=1
"进入visual模式，选中多行
"<leader>cc/cu 加/解

" 非 github 仓库的插件"
" Plugin 'git://git.wincent.com/command-t.git'
" 本地仓库的插件 "
 
call vundle#end()            " required



"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""新文件标题
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"新建.c,.h,.sh,.java文件，自动插入文件头
autocmd BufNewFile *.cpp,*.[ch],*.sh,*.java exec ":call SetTitle()"
""定义函数SetTitle，自动插入文件头
func SetTitle()
        "如果文件类型为.sh文件
        if &filetype == 'sh'
                call setline(1, "##########################################################################")
                call append(line("."), "# File Name: ".expand("%"))
                call append(line(".")+1, "# Author: yuwei ")
                call append(line(".")+2, "# mail: yw_ln@163.com")
                call append(line(".")+3, "# Created Time: ".strftime("%c"))
                call append(line(".")+4, "#########################################################################")
                call append(line(".")+5, "#!/bin/zsh")
                call append(line(".")+6, "PATH=/home/edison/bin:/home/edison/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/work/tools/gcc-3.4.5-glibc-2.3.6/bin")
                call append(line(".")+7, "export PATH")
                call append(line(".")+8, "")
        else
                call setline(1, "/*************************************************************************")
                call append(line("."), "        > File Name: ".expand("%"))
                call append(line(".")+1, "        > Author: yuwei ")
                call append(line(".")+2, "        > Mail: yw_ln@163.com ")
                call append(line(".")+3, "        > Created Time: ".strftime("%c"))
                call append(line(".")+4, " ************************************************************************/")
                call append(line(".")+5, "")
        endif
        if &filetype == 'cpp'
                call append(line(".")+6, "#include <iostream>")
                call append(line(".")+7, "#include <cstdio>")
                call append(line(".")+8, "#include <cstdlib>")
                call append(line(".")+9, "#include <cstring>")
                call append(line(".")+10, "#include <algorithm>")
                call append(line(".")+11, "#include <vector>")
                call append(line(".")+12, "#include <stack>")
                call append(line(".")+13, "#include <queue>")
                call append(line(".")+14, "#include <list>")
                call append(line(".")+15, "#include <map>")
                call append(line(".")+16, "#include <cmath>")
                call append(line(".")+17, "#include <string.h>")
                call append(line(".")+18, "#include <bitset>")
                call append(line(".")+19, "#include <fstream>")
                call append(line(".")+20, "#include <set>")
                call append(line(".")+21, "#include <climits>")
                call append(line(".")+22, "")
                call append(line(".")+23, "using namespace std;")
                call append(line(".")+24, "typedef long long ll;")
                call append(line(".")+25, "typedef unsigned int uint;")
                call append(line(".")+26, "typedef long double lb;")
                call append(line(".")+27, "const double PI = acos(-1.0);")
                call append(line(".")+28, "const double eps = 1e-6;")
                call append(line(".")+29, "const int INF = 0x3f3f3f3f;")
                call append(line(".")+30, "const int maxn = 100;")
                call append(line(".")+31, "")
                call append(line(".")+32, "int main()")
                call append(line(".")+33, "{")
                call append(line(".")+34, "    ")
                call append(line(".")+35, "    ")
                call append(line(".")+36, "    return 0;")
                call append(line(".")+37, "}")
        endif
        if &filetype == 'c'
                call append(line(".")+6, "#include <stdio.h>")
                call append(line(".")+7, "#include <stdlib.h>")
                call append(line(".")+8, "#include <string.h>")
                call append(line(".")+9, "")
        endif
        "        if &filetype == 'java'
        "                call append(line(".")+6,"public class ".expand("%"))
        "                call append(line(".")+7,"")
        "        endif
        "新建文件后，自动定位到文件末尾
        autocmd BufNewFile * normal G
endfunc
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"键盘命令
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

nmap <leader>w :w!<cr>
nmap <leader>f :find<cr>

" 映射全选+复制 ctrl+a
map <C-A> ggVGY
map! <C-A> <Esc>ggVGY
map <F12> gg=G
" 选中状态下 Ctrl+c 复制
vmap <C-c> "+y


"C,C++编译运行
map <F5> :call CompileRunGcc()<CR>
func! CompileRunGcc()
            exec "w"
    if &filetype == 'c'
        exec "!g++ % -o %<"
        exec "! ./%<"
    elseif &filetype == 'cpp'
            exec "!g++ % -o %<"
                exec "! ./%<"
        elseif &filetype == 'java'
        exec "!javac %"
        exec "!java %<"
    elseif &filetype == 'sh'
        :!./%
    endif
endfunc

"C,C++的调试
map <F8> :call Rungdb()<CR>
func! Rungdb()
    exec "w"
    exec "!g++ % -g -o %<"
    exec "!gdb ./%<"
endfunc





""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""实用设置
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 设置当文件被改动时自动载入
set autoread
" quickfix模式
autocmd FileType c,cpp map <buffer> <leader><space> :w<cr>:make<cr>
"代码补全
set completeopt=preview,menu
"允许插件
filetype plugin on
"共享剪贴板
set clipboard=unnamed

"从不备份
set nobackup
"make 运行
:set makeprg=g++\ -Wall\ \ %
"自动保存
set autowrite
set ruler                  " 打开状态栏标尺
set cursorline              " 突出显示当前行
set magic                  " 设置魔术
set guioptions-=T          " 隐藏工具栏
set guioptions-=m          " 隐藏菜单栏
"set statusline=\ %<%F[%1*%M%*%n%R%H]%=\ %y\ %0(%{&fileformat}\ %{&encoding}\ %c:%l/%L%)\
" 设置在状态行显示的信息
""set foldcolumn=0
""set foldmethod=indent
""set foldlevel=3
""set foldenable              " 开始折叠
" 不要使用vi的键盘模式，而是vim自己的
set nocompatible
" 语法高亮
set syntax=on
" 去掉输入错误的提示声音
set noeb
" 在处理未保存或只读文件的时候，弹出确认
set confirm
" 自动缩进
set autoindent
set cindent
" Tab键的宽度
set tabstop=4
" 统一缩进为4
set softtabstop=4
set shiftwidth=4
" 不要用空格代替制表符
set noexpandtab
" 在行和段开始处使用制表符
set smarttab
" 显示行号
set number
" 历史记录数
set history=1000
"禁止生成临时文件
set nobackup
set noswapfile
"搜索忽略大小写
set ignorecase
"搜索逐字符高亮
set hlsearch
set incsearch
"行内替换
set gdefault
"编码设置
set enc=utf-8
set fencs=utf-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936
"语言设置
set langmenu=zh_CN.UTF-8
set helplang=cn
" 我的状态行显示的内容（包括文件类型和解码）
set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [POS=%l,%v][%p%%]\ %{strftime(\"%d/%m/%y\ -\ %H:%M\")}
set statusline=[%F]%y%r%m%*%=[Line:%l/%L,Column:%c][%p%%]
" 总是显示状态行
set laststatus=2
" 命令行（在状态行下）的高度，默认为1，这里是2
set cmdheight=2
" 侦测文件类型
filetype on
" 载入文件类型插件
filetype plugin on
" 为特定文件类型载入相关缩进文件
filetype indent on
" 保存全局变量
set viminfo+=!
" 带有如下符号的单词不要被换行分割
set iskeyword+=_,$,@,%,#,-
" 字符间插入的像素行数目
set linespace=0
" 增强模式中的命令行自动完成操作
set wildmenu
" 使回格键（backspace）正常处理indent, eol, start等
set backspace=2
" 允许backspace和光标键跨越行边界
set whichwrap+=<,>,h,l
" 可以在buffer的任何地方使用鼠标（类似office中在工作区双击鼠标定位）
set mouse=a
set selection=exclusive
set selectmode=mouse,key
" 通过使用: commands命令，告诉我们文件的哪一行被改变过
set report=0
" 在被分割的窗口间显示空白，便于阅读
set fillchars=vert:\ ,stl:\ ,stlnc:\
" 高亮显示匹配的括号
set showmatch
" 匹配括号高亮的时间（单位是十分之一秒）
set matchtime=1
" 光标移动到buffer的顶部和底部时保持3行距离
set scrolloff=3
" 为C程序提供自动缩进
set smartindent
" 高亮显示普通txt文件（需要txt.vim脚本）
au BufRead,BufNewFile *  setfiletype txt
"自动补全
:inoremap ( ()<ESC>i
:inoremap ) <c-r>=ClosePair(')')<CR>
":inoremap { {<CR>}<ESC>O
":inoremap } <c-r>=ClosePair('}')<CR>
:inoremap [ []<ESC>i
:inoremap ] <c-r>=ClosePair(']')<CR>
:inoremap " ""<ESC>i
:inoremap ' ''<ESC>i
function! ClosePair(char)
        if getline('.')[col('.') - 1] == a:char
                return "\<Right>"
        else
                return a:char
        endif
endfunction

filetype plugin indent on    " required


"let g:solarized_termtrans  = 1        " 使用 termnal 背景
""let g:solarized_visibility = "high"   " 使用 :set list 显示特殊字符时的高亮级别
 
" GUI 模式浅色背景，终端模式深色背景
""if has('gui_running')
""    set background=light
""else
""    set background=dark
""endif
  
" 主题设置为 solarized
""colorscheme darkblue


"打开文件类型检测, 加了这句才可以用智能补全
set completeopt=longest,menu
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

