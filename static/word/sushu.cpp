//
//  main.cpp
//  sushu
//
//  Created by 小佩 on 2018/12/11.
//  Copyright © 2018年 pei. All rights reserved.
//

#include<iostream>
#include <cmath>
using namespace std;

int main(){
    int m,start,end,i,k,h=0,leap=1;
    cin>>start;
    cin>>end;
    for(m = start;m <= end;m++){
        k=sqrt(m+1);
        for(i = 2; i <= k; i ++)
            if(m % i==0){
                leap = 0;
                break;
            }
        if( leap ){
            cout<<m;
            h++;
            if( h% 5 == 0 )
                cout<<endl;
            else cout<<" ";
        }
        leap=1;
    }
    
    cout<<endl<<endl<<h;
    return 0;
    
}
