采用数组和innerHTML的方式效率高,但代码可读性不如createElement
createElement效率比上面要低一些,但是可读性较好
innerHTML采用字符拼接的方式,由于字符串的不可变性
会大量消耗内存,不要使用,效率很低,可读性不好

