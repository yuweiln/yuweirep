export TCODE=/Users/yuwei/code/tcode
export MWORK='/Users/yuwei/Documents/3. 工作'
export MPERSON='/Users/yuwei/Documents/4. 个人'

export MYHOME=/Users/yuwei/code/mysql
export MYCODE=/Users/yuwei/code/mysql-5.7.28

pgpath=9

function set_pg_path 
{
	if (( $pgpath == 1 )); then
		export MHOME=/Users/yuwei/code/pgdata/pggit
		export MDATA=/Users/yuwei/code/pgdata/pggit/data
		export MCODE=/Users/yuwei/code/pggit/postgres
	elif (( $pgpath == 9 )); then
        export MHOME=/Users/yuwei/code/pgdata/pg9
        export MDATA=/Users/yuwei/code/pgdata/pg9/data
		export MCODE=/Users/yuwei/code/postgresql-9.2.0
	elif (( $pgpath == 10 )); then
        export MHOME=/Users/yuwei/code/pgdata/pg10
        export MDATA=/Users/yuwei/code/pgdata/pg10/data
        export MCODE=/Users/yuwei/code/postgresql-10.0
    elif (( $pgpath == 11 )); then
		export MHOME=/Users/yuwei/code/pgdata/pg11
        export MDATA=/Users/yuwei/code/pgdata/pg11/data
        export MCODE=/Users/yuwei/code/postgresql-11.0
	elif (( $pgpath == 12 )); then
        export MHOME=/Users/yuwei/code/pgdata/pg12
        export MDATA=/Users/yuwei/code/pgdata/pg12/data
        export MCODE=/Users/yuwei/code/postgres-REL_12_STABLE
	else
		export MHOME=/Users/yuwei/code/pgdata/pggit
        export MDATA=/Users/yuwei/code/pgdata/pggit/data
        export MCODE=/Users/yuwei/code/pggit/postgres
	fi
}
set_pg_path pgpath

export PATH=${PATH}:/Users/yuwei/code/mysql/bin:$MHOME/bin
export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:$MHOME/lib

export TERM=xterm-color

export CLICOLOR=1
export LSCOLORS=gxfxcxdxbxegedabagacad
#export PS1='\[\e[01;33m\][\[\e[01;32m\]\u\[\e[01;33m\]@\[\e[01;35m\]\h:\[\e[01;33m\]] \[\e[01;36m\]\w \[\e[01;32m\]\$ '

# MySQL 
#alias mysql=/Users/yuwei/code/mysql/bin/mysql
alias mysqladmin=/Users/yuwei/code/mysql/bin/mysqladmin
alias myscope='cd $MYCODE; cscope -d .'
alias myscopebuild='cd $MYCODE; cscope -Rbkq'
alias mystart='/Users/yuwei/code/mysql/support-files/mysql.server start'
alias mystop='/Users/yuwei/code/mysql/support-files/mysql.server stop'
alias myrestart='/Users/yuwei/code/mysql/support-files/mysql.server restart'
alias myinit='mysqld --initialize --basedir=/Users/yuwei/code/mysql --datadir=/Users/yuwei/code/mysql/data'
alias mysql='mysql -uroot -p'

alias myc='cd $MYCODE'
alias myb='cd $MYHOME'
alias myd='cd $MYHOME/data'
alias mygdb='cd $MYCODE; gdb /Users/yuwei/code/mysql/bin/mysqld -x t1.bp'
alias mydebug='makedebug'
alias myrelease='makerelease'
alias mygrep='ps -ef|grep mysql'
alias kill9='func() {ps -ef | grep tmp_check | grep -v grep | cut -c 9-15 | xargs kill -9; }; func'
alias ll='ls -l'
alias vbash='vi ~/.bash_profile'
alias rbash='source ~/.bash_profile'

alias mscope='cd $MCODE; cscope -d .'
alias bscope='build_cscope'
alias bcscope='buildc_cscope'

# PG
alias mdebug='makedebug_pg'
alias mrelease='makerelease_pg'
alias cdc='cd $MCODE'
alias cdh='cd $MHOME'
alias cdd='cd $MHOME/data'
alias cdt='cd $TCODE'
alias minit='$MHOME/bin/initdb --encoding=UTF-8 --no-locale  -D $MDATA'
alias mstart='$MHOME/bin/pg_ctl -D $MDATA -l logfile start'
alias mstop='$MHOME/bin/pg_ctl -D $MDATA -l logfile stop'
alias msql='$MHOME/bin/psql -p 5432 postgres'
alias mgdb='cd $MCODE; gdb $MHOME/bin/postgres -x t1.bp'
alias mgrep='ps -ef|grep postgres'


function makedebug
{
	cd $MYCODE;
	cmake -DWITH_DEBUG=1 -DCMAKE_INSTALL_PREFIX=/Users/yuwei/code/mysql -DMYSQL_DATADIR=/Users/yuwei/code/mysql/data -DSYSCONFDIR=/etc -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_BOOST=boost;
	make clean 2>&1 | grep -E 'error|Error|ERROR';
	make -j 2 2>&1 | grep -E 'error|Error|ERROR';
	make install 2>&1 | grep -E 'error|Error|ERROR'; 
}

function makedebug_pg
{
    cd $MCODE;
	./configure --prefix=$MHOME --enable-debug 2>&1 | grep -E 'error|Error';
	make clean 2>&1 | grep -E 'error|Error';
    make BOOT_LDFLAGS=-Wl,-headerpad_max_install_names  2>&1 | grep -E 'error|Error';
    make install 2>&1 | grep -E 'error|Error';
}

function build_cscope
{
	if [ ! -n "$1" ] ;then
		cd $MCODE
	else
		cd $1
	fi

	find . -name "*.h" -o -name "*.c" -o -name "*.cc" -o -name "*.cpp" > cscope.files
	cscope -bkq -i cscope.files
	/Users/yuwei/.vim/ctags/bin/ctags -R
}

function buildc_cscope
{
	if [ ! -n "$1" ] ;then
		cd $MCODE
	else
		cd $1
	fi

	find . -name "*.h" -o -name "*.c" -o -name "*.cc" -o -name "*.cpp" > cscope.files
	cscope -bkq -i cscope.files
	/Users/yuwei/.vim/ctags/bin/ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .
}










