from pathlib import Path
import json,subprocess,tempfile
entries=[]
def group(language,category,rows):
 for line in rows.strip().splitlines():
  title,code=line.split(' :: ',1)
  code=code.replace('\\n','\n')
  entries.append(dict(id=f'{language.lower()}-{len(entries)+1}',language=language,category=category,title=title,description=f'{title}. A self-contained example using the {"JavaScript runtime" if language=="JavaScript" else "Python standard library"}.',code=code,source='Expanded collection'))
group('JavaScript','Arrays',r'''
Remove duplicate values :: const values = [1, 2, 2, 3]; console.log([...new Set(values)]);
Chunk an array :: const chunk=(xs,n)=>Array.from({length:Math.ceil(xs.length/n)},(_,i)=>xs.slice(i*n,(i+1)*n)); console.log(chunk([1,2,3,4,5],2));
Flatten nested arrays :: const data=[1,[2,[3,4]]]; console.log(data.flat(Infinity));
Partition by predicate :: const partition=(xs,test)=>xs.reduce((out,x)=>(out[test(x)?0:1].push(x),out),[[],[]]); console.log(partition([1,2,3,4],n=>n%2===0));
Zip two arrays :: const names=['Ada','Linus'],scores=[9,8]; console.log(names.map((name,i)=>[name,scores[i]]));
Find an intersection :: const a=[1,2,3],b=new Set([2,3,4]); console.log(a.filter(x=>b.has(x)));
Find a difference :: const a=[1,2,3],b=new Set([2,4]); console.log(a.filter(x=>!b.has(x)));
Rotate without mutation :: const rotate=(xs,n)=>{if(!xs.length)return [];const k=((n%xs.length)+xs.length)%xs.length;return [...xs.slice(k),...xs.slice(0,k)]}; console.log(rotate([1,2,3,4],-1));
Sort numbers numerically :: const scores=[10,2,30,1]; console.log([...scores].sort((a,b)=>a-b)); console.log(scores);
Build a sliding window :: const xs=[1,2,3,4,5],size=3; console.log(xs.slice(0,1+xs.length-size).map((_,i)=>xs.slice(i,i+size)));
''')
group('JavaScript','Objects',r'''
Pick selected keys :: const user={id:7,name:'Ada',role:'admin'}; console.log(Object.fromEntries(['id','name'].map(k=>[k,user[k]])));
Omit a property :: const user={name:'Ada',password:'secret'}; const {password,...publicUser}=user; console.log(publicUser);
Invert a lookup :: const codes={red:'R',green:'G'}; console.log(Object.fromEntries(Object.entries(codes).map(([k,v])=>[v,k])));
Group records by field :: const rows=[{type:'a',id:1},{type:'b',id:2},{type:'a',id:3}]; console.log(rows.reduce((out,row)=>{(out[row.type]??=[]).push(row);return out},{}));
Count occurrences safely :: const counts=new Map(); for(const value of ['a','b','a'])counts.set(value,(counts.get(value)??0)+1); console.log(Object.fromEntries(counts));
Merge nested configuration :: const defaults={ui:{theme:'dark',size:14},lang:'en'}; const overrides={ui:{size:16}}; console.log({...defaults,...overrides,ui:{...defaults.ui,...overrides.ui}});
Clone structured data :: const original={tags:['js'],date:new Date('2026-01-01')};const copy=structuredClone(original);copy.tags.push('python');console.log(original.tags,copy.tags,copy.date.toISOString());
Check own properties :: const obj=Object.create({inherited:1});obj.own=2;console.log(Object.hasOwn(obj,'own'),Object.hasOwn(obj,'inherited'));
Map object values :: const prices={book:10,pen:2};console.log(Object.fromEntries(Object.entries(prices).map(([k,v])=>[k,v*1.13])));
Freeze a configuration :: const config=Object.freeze({mode:'demo'});console.log(Object.isFrozen(config),config.mode);
''')
group('JavaScript','Strings',r'''
Create a URL slug :: const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');console.log(slug('  Café & Code!  '));
Capitalize words :: console.log('hello world'.replace(/\b\w/g,c=>c.toUpperCase()));
Truncate with an ellipsis :: const truncate=(s,n)=>s.length<=n?s:s.slice(0,n-1)+'…';console.log(truncate('A longer message',10));
Count Unicode code points :: const text='A😀B';console.log(text.length,Array.from(text).length);
Escape HTML text :: const entities={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};console.log('<b>safe & sound</b>'.replace(/[&<>"']/g,c=>entities[c]));
Mask an identifier :: const value='123456789';console.log(value.slice(-4).padStart(value.length,'•'));
Extract named captures :: const match=/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/.exec('2026-10-22');console.log({...match.groups});
Replace every occurrence :: console.log('red green red'.replaceAll('red','blue'));
Compare human-readable numbers :: const collator=new Intl.Collator('en',{numeric:true});console.log(['file10','file2','file1'].sort(collator.compare));
Find all word positions :: console.log([...('one two one').matchAll(/one/g)].map(m=>m.index));
''')
group('JavaScript','Functions',r'''
Compose two functions :: const compose=(f,g)=>x=>f(g(x));console.log(compose(x=>x*2,x=>x+3)(4));
Pipe transformations :: const pipe=(...fns)=>value=>fns.reduce((v,f)=>f(v),value);console.log(pipe(x=>x.trim(),x=>x.toUpperCase())('  hello  '));
Create a closure counter :: const counter=()=>{let n=0;return ()=>++n};const next=counter();console.log(next(),next());
Curry a binary function :: const add=a=>b=>a+b;console.log(add(5)(3));
Memoize a pure function :: const memo=f=>{const cache=new Map();return x=>{if(!cache.has(x))cache.set(x,f(x));return cache.get(x)}};const square=memo(n=>n*n);console.log(square(8),square(8));
Run a function once :: const once=f=>{let called=false,result;return(...args)=>{if(!called){result=f(...args);called=true}return result}};const next=once(()=>42);console.log(next(),next());
Use rest parameters :: const sum=(...values)=>values.reduce((a,b)=>a+b,0);console.log(sum(2,3,4));
Preserve method context :: const person={name:'Ada',hello(){return this.name}};const hello=person.hello.bind(person);console.log(hello());
Use default destructuring :: const greet=({name='Guest',punctuation='!'}={})=>`Hello ${name}${punctuation}`;console.log(greet(),greet({name:'Ada'}));
Make a generator :: function* range(start,end){for(let n=start;n<end;n++)yield n}console.log([...range(2,6)]);
''')
group('JavaScript','Async',r'''
Await a resolved value :: const read=async()=>({id:7});console.log(await read());
Run tasks concurrently :: console.log(await Promise.all([Promise.resolve('a'),Promise.resolve('b')]));
Inspect settled outcomes :: const results=await Promise.allSettled([Promise.resolve(3),Promise.reject(new Error('offline'))]);console.log(results.map(r=>r.status));
Use the first successful task :: console.log(await Promise.any([Promise.reject('failed'),Promise.resolve('ready')]));
Race completed tasks :: console.log(await Promise.race([Promise.resolve('first'),Promise.resolve('second')]));
Retry a failing operation :: const retry=async(fn,n)=>{for(let i=0;;i++){try{return await fn()}catch(e){if(i>=n)throw e}}};let tries=0;console.log(await retry(async()=>{if(++tries<3)throw Error('retry');return 'ready'},2),tries);
Process tasks sequentially :: const results=[];for(const n of [1,2,3])results.push(await Promise.resolve(n*2));console.log(results);
Abort a pending operation :: const controller=new AbortController();controller.abort('cancelled');console.log(controller.signal.aborted,controller.signal.reason);
Consume an async generator :: async function* stream(){yield 1;yield 2;yield 3}const values=[];for await(const n of stream())values.push(n);console.log(values);
Clean up after failure :: const events=[];try{await Promise.reject(new Error('failed'))}catch{events.push('handled')}finally{events.push('cleanup')}console.log(events);
''')
group('JavaScript','Numbers',r'''
Clamp within bounds :: const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));console.log(clamp(120,0,100));
Calculate an average :: const xs=[3,5,10];console.log(xs.reduce((a,b)=>a+b,0)/xs.length);
Find a median :: const xs=[9,1,4,6].sort((a,b)=>a-b),mid=Math.floor(xs.length/2);console.log(xs.length%2?xs[mid]:(xs[mid-1]+xs[mid])/2);
Use integer cents :: const cents=[1299,500,249];console.log((cents.reduce((a,b)=>a+b,0)/100).toFixed(2));
Format currency :: console.log(new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(1234.5));
Validate finite numbers :: console.log([4,NaN,Infinity,'4'].map(Number.isFinite));
Calculate a percentage change :: const before=80,after=100;console.log((after-before)/before*100);
Compare floating values :: const close=(a,b,tolerance=1e-9)=>Math.abs(a-b)<=tolerance;console.log(close(.1+.2,.3));
Work with large integers :: const large=9007199254740993n;console.log(String(large+2n));
Interpolate a value :: const lerp=(a,b,t)=>a+(b-a)*t;console.log(lerp(10,30,.25));
''')
group('JavaScript','Dates and time',r'''
Format an ISO timestamp :: console.log(new Date('2026-10-22T12:30:00Z').toISOString());
Add UTC calendar days :: const date=new Date('2026-12-31T12:00:00Z');date.setUTCDate(date.getUTCDate()+2);console.log(date.toISOString());
Calculate elapsed hours :: const start=Date.parse('2026-10-22T09:00:00Z'),end=Date.parse('2026-10-22T12:30:00Z');console.log((end-start)/3600000);
Get the last day of a month :: console.log(new Date(Date.UTC(2026,2,0)).getUTCDate());
Format a named timezone :: console.log(new Intl.DateTimeFormat('en-CA',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Toronto'}).format(new Date('2026-10-22T15:00:00Z')));
Test a leap year :: const leap=y=>y%4===0&&(y%100!==0||y%400===0);console.log([1900,2000,2024].map(leap));
Find a UTC weekday :: console.log(new Date('2026-10-22T00:00:00Z').getUTCDay());
Validate an ISO date :: const valid=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;console.log(valid('2026-02-28'),valid('2026-02-30'));
Format a duration :: const seconds=3671;console.log([Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,'0')).join(':'));
Compare date-only values :: const dates=['2026-10-22','2025-12-01','2026-01-02'];console.log(dates.sort());
''')
group('JavaScript','Collections',r'''
Store object keys in a Map :: const user={id:1},map=new Map([[user,'active']]);console.log(map.get(user));
Read a Set membership :: const allowed=new Set(['admin','editor']);console.log(allowed.has('editor'),allowed.has('guest'));
Create a set union :: console.log([...new Set([...new Set([1,2]),...new Set([2,3])])]);
Build a queue :: const queue=[];queue.push('first','second');console.log(queue.shift(),queue);
Build a stack :: const stack=['a','b'];stack.push('c');console.log(stack.pop(),stack);
Use a typed array :: const bytes=new Uint8Array([0,128,255]);console.log([...bytes],bytes.byteLength);
Read binary bytes :: const buffer=new ArrayBuffer(4),view=new DataView(buffer);view.setUint32(0,65535,false);console.log([...new Uint8Array(buffer)]);
Iterate indexed entries :: console.log([...['a','b'].entries()]);
Delete a map entry :: const map=new Map([['a',1],['b',2]]);map.delete('a');console.log([...map]);
Create a bounded recent list :: const recent=(items,item,limit)=>[item,...items.filter(x=>x!==item)].slice(0,limit);console.log(recent(['b','a','c'],'a',3));
''')
group('JavaScript','Web primitives',r'''
Parse a URL :: const url=new URL('https://example.com/docs?q=js#arrays');console.log(url.hostname,url.pathname,url.searchParams.get('q'));
Build query parameters :: const query=new URLSearchParams({q:'hello world',page:'2'});console.log(query.toString());
Read repeated query values :: console.log(new URLSearchParams('tag=js&tag=web').getAll('tag'));
Resolve a relative URL :: console.log(new URL('../image.png','https://example.com/docs/page/').href);
Encode UTF-8 text :: const data=new TextEncoder().encode('café');console.log([...data],new TextDecoder().decode(data));
Create HTTP headers :: const headers=new Headers({'Content-Type':'application/json'});console.log(headers.get('content-type'));
Parse a JSON response :: const response=new Response(JSON.stringify({ok:true}),{headers:{'Content-Type':'application/json'}});console.log(await response.json());
Read Blob content :: const blob=new Blob(['hello',' world'],{type:'text/plain'});console.log(blob.size,await blob.text());
Use form data :: const form=new FormData();form.set('name','Ada');form.append('tag','js');console.log([...form.entries()]);
Create a request :: const request=new Request('https://example.com/items',{method:'POST',body:JSON.stringify({id:7}),headers:{'Content-Type':'application/json'}});console.log(request.method,await request.json());
''')
group('JavaScript','Algorithms',r'''
Binary search a sorted array :: const search=(xs,target)=>{let lo=0,hi=xs.length-1;while(lo<=hi){const mid=(lo+hi)>>1;if(xs[mid]===target)return mid;xs[mid]<target?lo=mid+1:hi=mid-1}return -1};console.log(search([2,4,7,9],7));
Compute greatest common divisor :: const gcd=(a,b)=>{while(b)[a,b]=[b,a%b];return Math.abs(a)};console.log(gcd(48,18));
Check a palindrome :: const palindrome=s=>{const clean=s.toLowerCase().replace(/[^a-z0-9]/g,'');return clean===[...clean].reverse().join('')};console.log(palindrome('Never odd or even'));
Find two-sum indices :: const twoSum=(xs,target)=>{const seen=new Map();for(let i=0;i<xs.length;i++){if(seen.has(target-xs[i]))return [seen.get(target-xs[i]),i];seen.set(xs[i],i)}return []};console.log(twoSum([2,7,11],9));
Find the maximum subarray sum :: const xs=[-2,1,-3,4,-1,2,1,-5,4];let best=xs[0],current=xs[0];for(const x of xs.slice(1)){current=Math.max(x,current+x);best=Math.max(best,current)}console.log(best);
Traverse a tree depth-first :: const tree={value:'a',children:[{value:'b',children:[]},{value:'c',children:[]}]};const visit=node=>[node.value,...node.children.flatMap(visit)];console.log(visit(tree));
Find balanced brackets :: const valid=s=>{const stack=[],pairs={')':'(',']':'[','}':'{'};for(const c of s){if('([{'.includes(c))stack.push(c);else if(c in pairs&&stack.pop()!==pairs[c])return false}return stack.length===0};console.log(valid('([]){}'),valid('([)]'));
Merge sorted arrays :: const merge=(a,b)=>{const out=[];let i=0,j=0;while(i<a.length&&j<b.length)out.push(a[i]<=b[j]?a[i++]:b[j++]);return out.concat(a.slice(i),b.slice(j))};console.log(merge([1,4,7],[2,3,8]));
Find the first unique value :: const xs=['a','b','a','c'];const counts=new Map();for(const x of xs)counts.set(x,(counts.get(x)||0)+1);console.log(xs.find(x=>counts.get(x)===1));
Generate a powerset :: console.log([1,2,3].reduce((sets,x)=>sets.concat(sets.map(s=>[...s,x])),[[]]));
''')
group('Python','Lists and tuples',r'''
Remove duplicates in order :: values = [3, 1, 3, 2]\nprint(list(dict.fromkeys(values)))
Chunk a list :: values = list(range(7))\nprint([values[i:i+3] for i in range(0, len(values), 3)])
Flatten one level :: nested = [[1, 2], [3], [4, 5]]\nprint([item for row in nested for item in row])
Unpack with a remainder :: first, *middle, last = [1, 2, 3, 4]\nprint(first, middle, last)
Transpose a matrix :: matrix = [[1, 2, 3], [4, 5, 6]]\nprint(list(zip(*matrix)))
Sort records by two keys :: rows = [('Ada', 8), ('Ben', 9), ('Amy', 8)]\nprint(sorted(rows, key=lambda row: (-row[1], row[0])))
Rotate a list :: values = [1, 2, 3, 4]\nsteps = 2 % len(values)\nprint(values[steps:] + values[:steps])
Enumerate from one :: print(list(enumerate(['red', 'blue'], start=1)))
Copy nested lists :: import copy\noriginal = [[1], [2]]\ncloned = copy.deepcopy(original)\ncloned[0].append(3)\nprint(original, cloned)
Use immutable coordinates :: point = (3, 4)\nx, y = point\nprint(x * x + y * y)
''')
group('Python','Dictionaries and sets',r'''
Merge dictionaries :: defaults = {'theme': 'dark', 'size': 14}\nprint(defaults | {'size': 16})
Invert unique values :: codes = {'red': 'R', 'blue': 'B'}\nprint({value: key for key, value in codes.items()})
Read a default value :: settings = {'theme': 'dark'}\nprint(settings.get('language', 'en'))
Group records with setdefault :: groups = {}\nfor name, team in [('Ada','A'),('Ben','B'),('Amy','A')]:\n    groups.setdefault(team, []).append(name)\nprint(groups)
Filter dictionary values :: scores = {'Ada': 90, 'Ben': 60, 'Amy': 85}\nprint({name: score for name, score in scores.items() if score >= 80})
Intersect sets :: a, b = {1, 2, 3}, {2, 3, 4}\nprint(sorted(a & b))
Find a symmetric difference :: print(sorted({1, 2, 3} ^ {2, 3, 4}))
Check subset permissions :: required = {'read', 'write'}\nprint(required <= {'read', 'write', 'admin'})
Use a frozenset key :: lookup = {frozenset(['a', 'b']): 7}\nprint(lookup[frozenset(['b', 'a'])])
Remove a dictionary key safely :: data = {'id': 7, 'secret': 'hidden'}\ndata.pop('secret', None)\nprint(data)
''')
group('Python','Strings',r'''
Normalize whitespace :: text = '  hello   Python  '\nprint(' '.join(text.split()))
Format a readable title :: print('a practical python guide'.title())
Join a sequence :: print(', '.join(['red', 'green', 'blue']))
Pad an identifier :: print(str(42).zfill(6))
Count a substring :: print('banana'.count('an'))
Remove an exact prefix :: print('user:ada'.removeprefix('user:'))
Remove an exact suffix :: print('report.csv'.removesuffix('.csv'))
Split once with partition :: key, separator, value = 'theme=dark=night'.partition('=')\nprint(key, separator, value)
Translate characters :: table = str.maketrans({'a': '4', 'e': '3'})\nprint('create'.translate(table))
Compare Unicode case-insensitively :: print('Straße'.casefold() == 'STRASSE'.casefold())
''')
group('Python','Numbers and statistics',r'''
Calculate a mean :: from statistics import mean\nprint(mean([4, 6, 8]))
Calculate a median :: from statistics import median\nprint(median([9, 1, 5, 3]))
Find multiple modes :: from statistics import multimode\nprint(multimode([1, 1, 2, 2, 3]))
Measure population deviation :: from statistics import pstdev\nprint(round(pstdev([2, 4, 4, 4, 5, 5, 7, 9]), 2))
Use exact decimal arithmetic :: from decimal import Decimal\nprint(Decimal('0.1') + Decimal('0.2'))
Add rational fractions :: from fractions import Fraction\nprint(Fraction(1, 3) + Fraction(1, 6))
Compute greatest common divisor :: from math import gcd\nprint(gcd(48, 18))
Compute least common multiple :: from math import lcm\nprint(lcm(12, 18))
Compare approximate values :: from math import isclose\nprint(isclose(0.1 + 0.2, 0.3))
Use quotient and remainder :: print(divmod(3671, 60))
''')
group('Python','Functions',r'''
Use keyword-only parameters :: def greet(name, *, punctuation='!'):\n    return f'Hello {name}{punctuation}'\nprint(greet('Ada', punctuation='.'))
Accept arbitrary arguments :: def total(*values):\n    return sum(values)\nprint(total(2, 3, 5))
Accept keyword configuration :: def configure(**options):\n    return sorted(options.items())\nprint(configure(theme='dark', size=14))
Avoid mutable default arguments :: def append_value(value, items=None):\n    items = [] if items is None else items\n    items.append(value)\n    return items\nprint(append_value(1), append_value(2))
Return a closure :: def multiplier(factor):\n    def apply(value):\n        return value * factor\n    return apply\nprint(multiplier(3)(7))
Bind arguments with partial :: from functools import partial\nbase_two = partial(int, base=2)\nprint(base_two('1011'))
Memoize recursive work :: from functools import cache\n@cache\ndef factorial(n):\n    return 1 if n < 2 else n * factorial(n - 1)\nprint(factorial(6))
Preserve decorator metadata :: from functools import wraps\ndef twice(fn):\n    @wraps(fn)\n    def wrapper(value):\n        return fn(value) * 2\n    return wrapper\n@twice\ndef square(value):\n    return value * value\nprint(square(3), square.__name__)
Use positional-only parameters :: def divide(a, b, /):\n    return a / b\nprint(divide(9, 3))
Annotate a function :: def area(width: float, height: float) -> float:\n    return width * height\nprint(area(3.5, 2))
''')
group('Python','Iterators',r'''
Chain multiple iterables :: from itertools import chain\nprint(list(chain([1, 2], [3, 4])))
Take a finite slice :: from itertools import count, islice\nprint(list(islice(count(10, 2), 4)))
Pair adjacent values :: from itertools import pairwise\nprint(list(pairwise([1, 4, 9, 16])))
Generate combinations :: from itertools import combinations\nprint(list(combinations('ABC', 2)))
Generate permutations :: from itertools import permutations\nprint(list(permutations('AB', 2)))
Generate a Cartesian product :: from itertools import product\nprint(list(product(['S', 'M'], ['red', 'blue'])))
Accumulate running totals :: from itertools import accumulate\nprint(list(accumulate([2, 3, 5])))
Group consecutive values :: from itertools import groupby\nprint([(key, len(list(group))) for key, group in groupby('AAABBCC')])
Zip with missing values :: from itertools import zip_longest\nprint(list(zip_longest([1, 2, 3], ['a'], fillvalue='missing')))
Yield from another iterable :: def values():\n    yield 0\n    yield from range(1, 4)\nprint(list(values()))
''')
group('Python','Collections',r'''
Count words with Counter :: from collections import Counter\nprint(Counter('red blue red'.split()).most_common())
Group with defaultdict :: from collections import defaultdict\ngroups = defaultdict(list)\nfor key, value in [('a',1),('b',2),('a',3)]:\n    groups[key].append(value)\nprint(dict(groups))
Keep a bounded history :: from collections import deque\nhistory = deque(maxlen=3)\nhistory.extend([1, 2, 3, 4])\nprint(list(history))
Process a FIFO queue :: from collections import deque\nqueue = deque(['first', 'second'])\nprint(queue.popleft(), list(queue))
Rotate a deque :: from collections import deque\nvalues = deque([1, 2, 3])\nvalues.rotate(1)\nprint(list(values))
Use namedtuple fields :: from collections import namedtuple\nPoint = namedtuple('Point', 'x y')\np = Point(3, 4)\nprint(p.x, p.y)
Layer configuration with ChainMap :: from collections import ChainMap\nconfig = ChainMap({'theme':'light'}, {'theme':'dark','size':14})\nprint(config['theme'], config['size'])
Subtract inventory counts :: from collections import Counter\nstock = Counter(apple=5, pear=3)\nprint(dict(stock - Counter(apple=2)))
Read the most common element :: from collections import Counter\nprint(Counter([3, 1, 3, 2, 3]).most_common(1))
Use an ordered eviction cache :: from collections import OrderedDict\ncache = OrderedDict(a=1, b=2)\ncache.move_to_end('a')\nprint(cache.popitem(last=False))
''')
group('Python','Dates and calendars',r'''
Parse an ISO date :: from datetime import date\nprint(date.fromisoformat('2026-10-22'))
Add a timedelta :: from datetime import date, timedelta\nprint(date(2026, 12, 31) + timedelta(days=2))
Calculate elapsed seconds :: from datetime import datetime\na = datetime.fromisoformat('2026-10-22T09:00:00')\nb = datetime.fromisoformat('2026-10-22T10:30:00')\nprint((b-a).total_seconds())
Create a UTC timestamp :: from datetime import datetime, timezone\nprint(datetime(2026, 10, 22, 12, tzinfo=timezone.utc).isoformat())
Convert a timezone :: from datetime import datetime, timezone\nfrom zoneinfo import ZoneInfo\nprint(datetime(2026, 10, 22, 15, tzinfo=timezone.utc).astimezone(ZoneInfo('America/Toronto')).isoformat())
Get month length :: import calendar\nprint(calendar.monthrange(2026, 2)[1])
Check leap years :: import calendar\nprint(calendar.isleap(1900), calendar.isleap(2000))
Get ISO week information :: from datetime import date\nprint(tuple(date(2026, 10, 22).isocalendar()))
Parse a formatted date :: from datetime import datetime\nprint(datetime.strptime('22/10/2026', '%d/%m/%Y').date())
List the weekdays in a week :: from datetime import date, timedelta\nstart = date(2026, 10, 19)\nprint([(start + timedelta(days=i)).isoformat() for i in range(5)])
''')
group('Python','Files and paths',r'''
Inspect path components :: from pathlib import PurePosixPath\np = PurePosixPath('/reports/annual.csv')\nprint(p.name, p.stem, p.suffix)
Change a file extension :: from pathlib import PurePosixPath\nprint(PurePosixPath('report.csv').with_suffix('.json'))
Join path segments :: from pathlib import PurePosixPath\nprint(PurePosixPath('data') / '2026' / 'report.csv')
Read and write UTF-8 text :: from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as folder:\n    p = Path(folder) / 'note.txt'\n    p.write_text('hello café', encoding='utf-8')\n    print(p.read_text(encoding='utf-8'))
Write binary bytes :: from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as folder:\n    p = Path(folder) / 'data.bin'\n    p.write_bytes(bytes([0, 128, 255]))\n    print(list(p.read_bytes()))
Find files with glob :: from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as folder:\n    root = Path(folder)\n    for name in ['a.txt', 'b.csv', 'c.txt']:\n        (root / name).touch()\n    print(sorted(p.name for p in root.glob('*.txt')))
Calculate a relative path :: from pathlib import PurePosixPath\nprint(PurePosixPath('/app/data/file.csv').relative_to('/app'))
Use a text buffer :: from io import StringIO\nbuffer = StringIO()\nbuffer.write('first ')\nbuffer.write('second')\nprint(buffer.getvalue())
Copy a file safely in a temp directory :: from pathlib import Path\nfrom tempfile import TemporaryDirectory\nimport shutil\nwith TemporaryDirectory() as folder:\n    source = Path(folder) / 'a.txt'\n    source.write_text('sample')\n    target = Path(folder) / 'b.txt'\n    shutil.copy2(source, target)\n    print(target.read_text())
Walk path parents :: from pathlib import PurePosixPath\nprint([str(p) for p in PurePosixPath('/a/b/c.txt').parents])
''')
group('Python','Serialization',r'''
Encode sorted JSON :: import json\nprint(json.dumps({'b':2,'a':1}, sort_keys=True))
Decode JSON data :: import json\nprint(json.loads('{"active": true, "count": 3}'))
Read CSV records :: import csv\nfrom io import StringIO\ntext = StringIO('name,score'+chr(10)+'Ada,90'+chr(10)+'Ben,80')\nprint(list(csv.DictReader(text)))
Write a CSV row :: import csv\nfrom io import StringIO\nout = StringIO()\ncsv.writer(out).writerow(['Ada', 'hello, world'])\nprint(out.getvalue().strip())
Parse TOML configuration :: import tomllib\nprint(tomllib.loads('title = "Demo"'+chr(10)+'count = 3'))
Read an INI section :: from configparser import ConfigParser\nconfig = ConfigParser()\nconfig.read_string('[app]'+chr(10)+'theme = dark')\nprint(config['app']['theme'])
Encode Base64 bytes :: import base64\nprint(base64.b64encode(b'hello').decode('ascii'))
Decode Base64 bytes :: import base64\nprint(base64.b64decode('aGVsbG8=', validate=True).decode('utf-8'))
Compress and restore text :: import gzip\ndata = b'hello ' * 100\ncompressed = gzip.compress(data, mtime=0)\nprint(gzip.decompress(compressed) == data)
Read an XML element :: from xml.etree import ElementTree\nroot = ElementTree.fromstring('<book><title>Python</title></book>')\nprint(root.findtext('title'))
''')
group('Python','Regular expressions',r'''
Extract all integers :: import re\nprint(re.findall(r'\d+', 'Order 12 has 3 items'))
Validate a simple identifier :: import re\nprint(bool(re.fullmatch(r'[A-Za-z_][A-Za-z0-9_]*', 'user_42')))
Use named groups :: import re\nmatch = re.fullmatch(r'(?P<year>\d{4})-(?P<month>\d{2})', '2026-10')\nprint(match.groupdict())
Replace repeated whitespace :: import re\nprint(re.sub(r'\s+', ' ', 'one   two    three'))
Split on multiple delimiters :: import re\nprint(re.split(r'[,;]+', 'red,green;blue'))
Escape user text for matching :: import re\npattern = re.escape('a+b?')\nprint(bool(re.fullmatch(pattern, 'a+b?')))
Use a replacement callback :: import re\nprint(re.sub(r'\d+', lambda m: str(int(m.group())*2), '3 apples and 4 pears'))
Find match offsets :: import re\nprint([m.span() for m in re.finditer('cat', 'cat dog cat')])
Compile a reusable pattern :: import re\npattern = re.compile(r'python', re.IGNORECASE)\nprint(bool(pattern.search('Learn PYTHON')))
Use a non-greedy match :: import re\nprint(re.findall(r'<.*?>', '<b>hello</b>'))
''')
group('Python','Classes and typing',r'''
Define a dataclass :: from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y: int\nprint(Point(3, 4))
Use an immutable dataclass :: from dataclasses import dataclass\n@dataclass(frozen=True)\nclass Config:\n    theme: str = 'dark'\nprint(Config())
Give each instance its own list :: from dataclasses import dataclass, field\n@dataclass\nclass Basket:\n    items: list = field(default_factory=list)\na, b = Basket(), Basket()\na.items.append('apple')\nprint(a.items, b.items)
Convert a dataclass to a dictionary :: from dataclasses import dataclass, asdict\n@dataclass\nclass User:\n    name: str\nprint(asdict(User('Ada')))
Create an enumeration :: from enum import Enum\nclass Status(Enum):\n    READY = 'ready'\n    DONE = 'done'\nprint(Status.READY.value)
Expose a calculated property :: class Rectangle:\n    def __init__(self, width, height):\n        self.width, self.height = width, height\n    @property\n    def area(self):\n        return self.width * self.height\nprint(Rectangle(3, 4).area)
Construct with a classmethod :: class User:\n    def __init__(self, name):\n        self.name = name\n    @classmethod\n    def from_record(cls, record):\n        return cls(record['name'])\nprint(User.from_record({'name':'Ada'}).name)
Describe a typed dictionary :: from typing import TypedDict\nclass User(TypedDict):\n    name: str\n    active: bool\nuser: User = {'name':'Ada','active':True}\nprint(user)
Use an ordered dataclass :: from dataclasses import dataclass\n@dataclass(order=True)\nclass Score:\n    value: int\nprint(sorted([Score(8), Score(3)]))
Use structural pattern matching :: event = {'type':'created','id':7}\nmatch event:\n    case {'type':'created','id':identifier}:\n        print('Created', identifier)\n    case _:\n        print('Unknown')
''')
group('Python','Errors and testing',r'''
Catch a conversion error :: try:\n    value = int('not a number')\nexcept ValueError:\n    print('Invalid integer')
Always perform cleanup :: events = []\ntry:\n    raise RuntimeError('offline')\nexcept RuntimeError:\n    events.append('handled')\nfinally:\n    events.append('cleanup')\nprint(events)
Raise a domain exception :: class InvalidAge(ValueError):\n    pass\ndef validate(age):\n    if age < 0:\n        raise InvalidAge('Age must be nonnegative')\ntry:\n    validate(-1)\nexcept InvalidAge as error:\n    print(str(error))
Chain an exception :: try:\n    try:\n        int('x')\n    except ValueError as error:\n        raise RuntimeError('Invalid input') from error\nexcept RuntimeError as error:\n    print(type(error.__cause__).__name__)
Create a context manager :: from contextlib import contextmanager\n@contextmanager\ndef tracked(events):\n    events.append('enter')\n    try:\n        yield\n    finally:\n        events.append('exit')\nevents = []\nwith tracked(events):\n    events.append('work')\nprint(events)
Suppress a specific exception :: from contextlib import suppress\nwith suppress(KeyError):\n    {}['missing']\nprint('Continued')
Check expected values with assertions :: def add(a, b):\n    return a + b\nassert add(2, 3) == 5\nprint('Passed')
Mock a dependency :: from unittest.mock import Mock\nclient = Mock()\nclient.fetch.return_value = {'id':7}\nprint(client.fetch())\nclient.fetch.assert_called_once()
Test exceptions with unittest :: import unittest\ncase = unittest.TestCase()\nwith case.assertRaises(ValueError):\n    int('x')\nprint('Expected error confirmed')
Capture standard output :: from contextlib import redirect_stdout\nfrom io import StringIO\noutput = StringIO()\nwith redirect_stdout(output):\n    print('hello')\nprint(repr(output.getvalue().strip()))
''')
group('Python','Async and concurrency',r'''
Run an async function :: import asyncio\nasync def main():\n    return 'ready'\nprint(asyncio.run(main()))
Gather concurrent results :: import asyncio\nasync def double(n):\n    await asyncio.sleep(0)\n    return n * 2\nasync def main():\n    return await asyncio.gather(*(double(n) for n in range(3)))\nprint(asyncio.run(main()))
Consume an async generator :: import asyncio\nasync def stream():\n    for n in range(3):\n        yield n\nasync def main():\n    return [n async for n in stream()]\nprint(asyncio.run(main()))
Limit concurrency with a semaphore :: import asyncio\nasync def main():\n    gate = asyncio.Semaphore(2)\n    async def work(n):\n        async with gate:\n            await asyncio.sleep(0)\n            return n\n    return await asyncio.gather(*(work(n) for n in range(4)))\nprint(asyncio.run(main()))
Use an async queue :: import asyncio\nasync def main():\n    queue = asyncio.Queue()\n    await queue.put('job')\n    value = await queue.get()\n    queue.task_done()\n    await queue.join()\n    return value\nprint(asyncio.run(main()))
Run blocking work in a thread :: import asyncio\nasync def main():\n    return await asyncio.to_thread(sum, [1, 2, 3])\nprint(asyncio.run(main()))
Cancel an async task :: import asyncio\nasync def main():\n    task = asyncio.create_task(asyncio.sleep(60))\n    task.cancel()\n    try:\n        await task\n    except asyncio.CancelledError:\n        return 'cancelled'\nprint(asyncio.run(main()))
Collect exceptions from tasks :: import asyncio\nasync def fail():\n    raise ValueError('demo')\nasync def main():\n    results = await asyncio.gather(fail(), return_exceptions=True)\n    return [type(item).__name__ for item in results]\nprint(asyncio.run(main()))
Map work with a thread pool :: from concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(max_workers=2) as pool:\n    print(list(pool.map(lambda n: n*n, [1, 2, 3])))
Coordinate tasks with an event :: import asyncio\nasync def main():\n    event = asyncio.Event()\n    async def worker():\n        await event.wait()\n        return 'started'\n    task = asyncio.create_task(worker())\n    event.set()\n    return await task\nprint(asyncio.run(main()))
''')
group('Python','Algorithms and data',r'''
Find a sorted insertion point :: from bisect import bisect_left\nvalues = [2, 4, 7, 9]\nprint(bisect_left(values, 6))
Read the smallest heap item :: import heapq\nvalues = [7, 2, 9, 1]\nheapq.heapify(values)\nprint(heapq.heappop(values))
Find the three largest values :: import heapq\nprint(heapq.nlargest(3, [4, 9, 2, 7, 5]))
Traverse a graph breadth-first :: from collections import deque\ngraph = {'a':['b','c'],'b':['d'],'c':[],'d':[]}\nqueue, seen, order = deque(['a']), {'a'}, []\nwhile queue:\n    node = queue.popleft()\n    order.append(node)\n    for child in graph[node]:\n        if child not in seen:\n            seen.add(child)\n            queue.append(child)\nprint(order)
Find two-sum indices :: def two_sum(values, target):\n    seen = {}\n    for i, value in enumerate(values):\n        if target-value in seen:\n            return seen[target-value], i\n        seen[value] = i\n    return None\nprint(two_sum([2, 7, 11], 9))
Check a palindrome :: text = 'Never odd or even'\nclean = ''.join(c.lower() for c in text if c.isalnum())\nprint(clean == clean[::-1])
Calculate a running maximum :: values = [3, 1, 5, 2, 8]\nfrom itertools import accumulate\nprint(list(accumulate(values, max)))
Query an in-memory SQLite database :: import sqlite3\nwith sqlite3.connect(':memory:') as db:\n    db.execute('CREATE TABLE scores (name TEXT, value INTEGER)')\n    db.executemany('INSERT INTO scores VALUES (?, ?)', [('Ada',90),('Ben',80)])\n    print(db.execute('SELECT name FROM scores WHERE value > ?', (85,)).fetchall())
Hash bytes with SHA-256 :: import hashlib\nprint(hashlib.sha256(b'hello').hexdigest())
Build a URL query string :: from urllib.parse import urlencode\nprint(urlencode({'q':'hello world','page':2}))
''')
assert sum(e['language']=='JavaScript' for e in entries)==100
assert sum(e['language']=='Python' for e in entries)==150
for entry in entries:
 command=['node','--input-type=module','-e',entry['code']] if entry['language']=='JavaScript' else ['python','-c',entry['code']]
 result=subprocess.run(command,capture_output=True,text=True,timeout=5)
 if result.returncode:raise RuntimeError(entry['title']+'\n'+result.stderr)
 entry['output']=result.stdout.strip()
# Preserve every original snippet verbatim, even incomplete JSX examples.
originals=[]
for path in sorted(Path('src/_db').rglob('code_*.txt')):
 category='Original archive'
 title=path.parent.name.replace('_',' ').title()+' · '+path.stem.replace('_',' ')
 originals.append(dict(id='original-'+str(len(originals)+1),language='JavaScript',category=category,title=title,description='Preserved from the original JavaScript Field Guide. Some entries are React fragments that require the surrounding component.',code=path.read_text(),output='',source=str(path),legacy=True))
Path('src/examples.json').write_text(json.dumps(entries+originals,indent=2,ensure_ascii=False)+'\n')
print(f'Validated {len(entries)} new runnable examples; preserved {len(originals)} original snippets.')
