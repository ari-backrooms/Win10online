/* 此处放加减乘的事例 */
math_new_operator = [];
            math_new_operator['+']=(a,b)=>{
                a=a.toString(),b=b.toString();
                if(a[0]==='-'&&b[0]!=='-')return math_new_operator['-'](a.slice(1),b);
                if(a[0]!=='-'&&b[0]==='-')return math_new_operator['-'](a,b.slice(1));
                if(a[0]==='-'&&b[0]==='-')return '-'+math_new_operator['+'](a.slice(1),b.slice(1));
                a=a.replace('.','')===a?a+'.0':a;
                b=b.replace('.','')===b?b+'.0':b;
                let c=a.split('.')[0],d=a.split('.')[1],
                    e=b.split('.')[0],f=b.split('.')[1],
                    k=Math.max(c.length,e.length),
                    l=Math.max(d.length,f.length);
                    c=c.padStart(k+1,'0'),e=e.padStart(k+1,'0');
                    d=d.padEnd(l,'0'),f=f.padEnd(l,'0');
                a=c+d,b=e+f,r='',k=0,s=0;
                for (var i=a.length-1;i>=0;i--) {
                    s+=(+a[i])+(+b[i])+k;
                    if(s>=10)k=1,s%=10;else k=0;
                    r=s+r,s=0;
                }
                r=(r.slice(0,k-l)+'.'+r.slice(k-l)).replace(/\.?0+$/,'').replace(/^[0]+/,'');
                if (r[0]==='.')r='0'+r;
                return r
            }
            var judge_min = (a,b)=> {
                a=a.toString(),b=b.toString();
                if(a[0]==='-'&&b[0]==='-')return judge_min(b.slice(1),a.slice(1));
                if(a[0]==='-'&&b[0]!=='-')return true;
                if(b[0]==='-'&&a[0]!=='-')return false;
                if(a.length>b.length)return false;
                if(a.length<b.length)return true;
                for (var i=0;i<a.length;i++){
                    if(a[i]>b[i])return false;
                    if(a[i]<b[i])return true;
                }
                return false;
            }
            math_new_operator['-']=(a,b)=>{
                if(b=='0')return a.toString();
                a=a.toString(),b=b.toString();
                if(judge_min(a,b)) return('-'+math_new_operator['-'](b,a)).replace('--','');
                if(a[0]==='-'&&b[0]!=='-')return('-'+math_new_operator['+'](a.slice(1),b)).replace('--','');
                if(a[0]!=='-'&&b[0]==='-')return(math_new_operator['+'](a,b.slice(1))).replace('--','');
                if(a[0]==='-'&&b[0]==='-')return('-'+math_new_operator['-'](a.slice(1),b.slice(1))).replace('--','');
                a=a.replace('.','')===a?a+'.0':a;
                b=b.replace('.','')===b?b+'.0':b;
                let c=a.split('.')[0],d=a.split('.')[1],
                    e=b.split('.')[0],f=b.split('.')[1],
                    k=Math.max(c.length,e.length),
                    l=Math.max(d.length,f.length);
                    c=c.padStart(k+1,'0'),e=e.padStart(k+1,'0');
                    d=d.padEnd(l,'0'),f=f.padEnd(l,'0');
                a=c+d,b=e+f,r='',k=0,s=0;
                for (var i=a.length-1;i>=0;i--) {
                    s+=(+a[i])-(+b[i])-k;
                    if(s<0)k=1,s+=10;else k=0;
                    r=s+r,s=0;
                }   
                r=(r.slice(0,k-l)+'.'+r.slice(k-l)).replace(/\.?0+$/,'').replace(/^[0]+/,'');
                if (r[0]==='.')r='0'+r;
                return r;
            }
            var multiplyLists = (a,b) => {
                if (!a||!b) return 0;
                var t = [
                    [1,2,3,4,5,6,7,8,9],
                    [2,4,6,8,10,12,14,16,18],
                    [3,6,9,12,15,18,21,24,27],
                    [4,8,12,16,20,24,28,32,36],
                    [5,10,15,20,25,30,35,40,45],
                    [6,12,18,24,30,36,42,48,54],
                    [7,14,21,28,35,42,49,56,63],
                    [8,16,24,32,40,48,56,64,72],
                    [9,18,27,36,45,54,63,72,81]
                ];
                return t[a-1][b-1]
            }
            const matfloor = (a) => {
                if (a.split('.').length>1) return +a.split('.')[0];
                else return +a;
            }
            math_new_operator['*']=(a,b)=>{
                if (!a || !b) return 0;
                a=a.toString(),b=b.toString();
                if (a[0]==='-'&&b[0]==='-') return math_new_operator['*'](a.slice(1),b.slice(1));
                else if (a[0]==='-') return '-' + math_new_operator['*'](a.slice(1),b);
                else if (b[0]==='-') return '-' + math_new_operator['*'](a,b.slice(1));
                a=a.replace('.','')===a?a+'.0':a;
                b=b.replace('.','')===b?b+'.0':b;
                a='0'+a,b='0'+b;
                let c=a.replace('.',''),d=b.replace('.','');
                let e=a.split('.')[1].length+b.split('.')[1].length;
                var k=0,g=0,r='',p='';
                for(var i=c.length-1;i>=0;i--){
                    for(var j=d.length-1;j>=0;j--){
                        g=multiplyLists(parseInt(c[i]),parseInt(d[j]))+k;
                        if(g>9) k=matfloor(String(g/10)),g%=10;
                        else k=0;
                        p=g+p;
                    }
                    r = math_new_operator['+'](r,p+''.padStart(c.length - i - 1,'0'));
                    p = '';
                }
                r=r.padStart(e+1,'0')
                r=(r.slice(0,r.length-e)+'.'+r.slice(r.length-e)).replace(/\.?0+$/,'').replace(/^[0]+/,'');
                if (r.at(-1)==='.')r=r.slice(0,-1);
                if (r[0] === '.') r = '0' + r;
                return r;
            }
            math_new_operator['/']=(a,b)=>{
                a=a.toString(), b=b.toString()
                // 1.2 / 1.4
                // 12 / 14
                // 123131231231 / 123
                // 1 / 123, 12 / 123, 123/ 123, 1/123, 12/123...
                var sign ='';
                if (a[0] === '-' && b[0] !== '-') sign = '-';
                if (a[0] !== '-' && b[0] === '-') sign = '-';
                a = a.replace('-',''),
                b = b.replace('-','')
                if (b === '0') return "除数不能为0"
                var res = '';
                var ap = (a.split('.')[1] ?? '').length;
                var bp = (b.split('.')[1] ?? '').length;
                var the_max = Math.max(ap,bp);
                a = a.replace('.', ''),
                b = b.replace('.', '');
                if (ap === the_max) {
                    b = b.padEnd(ap + 1, '0');
                }
                if (bp === the_max) {
                    a = a.padEnd(bp + 1, '0')
                }
                a = a.replace(/^0+/,''), b = b.replace(/^0+/,'')
                function getShortsFloorMinValue(c,d) {
                    var val = 0;
                    while(c[0] !== '-') {
                        c = math_new_operator['-'](c,d)
                        val++;
                    }
                    if (c[0] === '-') val--;
                    return val
                }
                a += '000000000000000';
                var i = 0;
                var yu = 0;
                while (i < a.length) {
                    res+=getShortsFloorMinValue(math_new_operator['+'](a[i],math_new_operator['*'](10, yu)), b);
                    yu = math_new_operator['-'](
                        math_new_operator['+'](a[i],math_new_operator['*'](10, yu)), math_new_operator['*'](b,getShortsFloorMinValue(math_new_operator['+'](a[i],math_new_operator['*'](10, yu)), b))
                    );
                    i++;
                }
                res = res.slice(0, res.length - 15) + '.' + res.slice(res.length - 15, res.length - 1)
                res = res.replace(/^0+/, '').replace(/(?<=\.\d*)0+$|\.0*$/,'');
                if (res[0] === '.') res = '0' + res;
                return sign + res;
            }
