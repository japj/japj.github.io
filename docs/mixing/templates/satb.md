---
draft: true
---
# SATB

Input Bus|Name
---|---
1|Soprano
2|Alto
3|Tenor
4|Bass

:::note
Stereo Bus setup not needed if Part mix is not stereo
:::

Stereo Bus|Name
---|---
5|Soprano Left
6|Alto Left
7|Tenor Left
8|Bass Left
9|Soprano Right
10|Alto Right
11|Tenor Right
12|Bass Right

Output Bus|Name
---|---
20|Total
21|Soprano Part Predominant
22|Alto Part Predominant
23|Tenor Part Predominant
24|Bass Part Predominant
25|Soprano Part Only
26|Alto Part Only
27|Tenor Part Only
28|Bass Part Only
29|Soprano No Part
30|Alto No Part
31|Tenor No Part
32|Bass No Part


Working backwards


```mermaid
flowchart LR
    subgraph Input
    Soprano
    Alto
    Bass
    Tenor
    end

    subgraph Output
    Total
    SNP[Soprano NoPart]
    ANP[Alto NoPart]
    TNP[Tenor NoPart]
    BNP[Tenor NoPart]
    end

    Soprano-->Total
    Alto-->Total
    Tenor-->Total
    Bass-->Total

    Soprano-->ANP
    Soprano-->TNP
    Soprano-->BNP

    Alto-->SNP
    Alto-->TNP
    Alto-->BNP

    Tenor-->SNP
    Tenor-->ANP
    Tenor-->BNP

    Bass-->SNP
    Bass-->ANP
    Bass-->TNP
```

```mermaid
flowchart LR
    subgraph Input
    Soprano
    Alto
    Bass
    Tenor
    end

    subgraph Output
    Total
    end

    Soprano-->Total
    Alto-->Total
    Tenor-->Total
    Bass-->Total
```

```mermaid
flowchart LR
    subgraph Input
    Soprano
    Alto
    Bass
    Tenor
    end

    subgraph Output
    SNP[Soprano NoPart]
    end

    Alto-->SNP

    Tenor-->SNP

    Bass-->SNP
```



bla

```mermaid
flowchart LR
    SMid[Soprano Midi] -- Bus 1 --> B1[Soprano]
    AMid[Alto Midi]    -- Bus 2 --> B2[Alto]
    TMid[Tenor Midi]   -- Bus 3 --> B3[Tenor]
    BMid[Bass Midi]    -- Bus 4 --> B4[Bass]

    B1 -- Bus  5 --> B5[S Left]
    B2 -- Bus  6 --> B6[A Left]
    B3 -- Bus  7 --> B7[T Left]
    B4 -- Bus  8 --> B8[B Left]

    B1 -- Bus  9 -->  B9[S Right]
    B2 -- Bus 10 --> B10[A Right]
    B3 -- Bus 11 --> B11[T Right]
    B4 -- Bus 12 --> B12[B Right]

    B1 -- Bus 20 --> B20[Total]
    B2 -- Bus 20 --> B20[Total]
    B3 -- Bus 20 --> B20[Total]
    B4 -- Bus 20 --> B20[Total] 
```

