import random

def compare(guess, ans):
  a=0
  b=0
  for x in range (0,4):
    if guess[x]==ans[x]:
      a=a+1
    else:
      if guess.count(ans[x])==1:
        b=b+1
  response=str(a)+'a'+str(b) + 'b'
  return response

def CheckValid(num):
  number=0
  if len(num)!=4:
    return False
  for x in range (0,11):
    if num.count(str(x))==1:
      number=number+1
    elif num.count(str(x))>1:
      return False
  if number!=4:
    return False
  return True
def HintValid(hint):
  try:
    if int(hint[0])>4 or int(hint[0])<0 or int(hint[2])>4 or int(hint[2])<0:
      return False
  except:
    return False
  if hint[1]!='a' or hint[3]!='b':
    return False
  return True

def CheckerMode():
  ans = input("Answer: ")
  while CheckValid(ans)==False:
    print('Invalid')
    ans = input("Answer: ")
  while True:
    guess = input("Guess: ")
    if guess=='end':
      break
    else:
      if CheckValid(guess)==True:
        print(compare(guess, ans))
      else:
        print ('Invalid')
def PlayMode():
  nums=['1','2','3','4','5','6','7','8','9','0']
  random.shuffle(nums)
  ans=nums[0]+nums[1]+nums[2]+nums[3]
  count=1
  guess=input('Guess: ')
  while CheckValid(guess)==False:
    print('Invalid')
    guess=input('Guess: ')
  while compare(guess,ans)!='4a0b':
    print(compare(guess,ans))
    guess=input('Guess: ')
    count=count+1
  print('Solved')
  print('Used '+str(count)+' tries')
def BruteForceGuess():
  number= 122
  strnum=''
  nums=[]
  while number!=9876:
    number=number+1
    strnum=str(number)
    while len(strnum)<4:
      strnum='0'+strnum
    while CheckValid(strnum)==False:
      number=number+1
      strnum=str(number)
      while len(strnum)<4:
        strnum='0'+strnum
    nums.append(strnum)
    
  random.shuffle(nums)
  guess=nums[0]
  print(guess)
  tries=1
  hint=input('Hint: ')
  while HintValid(hint)==False:
    print('Invalid')
    hint=input('Hint: ')
  while hint!='4a0b':
    x=0
    while x<len(nums):
      if compare(guess,nums[x]) != hint:
        del nums[x]
      else:
        x=x+1
    if len(nums)==0:
      print('Error ')
      break
    elif len(nums)==1:
      print(nums[0])
      print('Force win')
      tries=tries+1
      break
    random.shuffle(nums)
    guess=nums[0]
    print(guess)
    tries=tries+1
    hint=input('Hint: ')
    while HintValid(hint)==False:
      print('Invalid')
      hint=input('Hint: ')
  print('It took '+str(tries)+' tries.')
  
def TestMode():
  mode=int(input('GuessMode([0]BruteForce): '))
  if mode==0:
    BruteForceGuess()


mode = int(input('Mode([0]Checker [1]Guess [2]Test [3]Compete): '))

if mode==0:
  CheckerMode()
elif mode==1:
  PlayMode()
elif mode==2:
  TestMode()