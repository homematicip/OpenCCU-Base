#include <CommonConversion.h>

#include <sstream>
#include <iomanip>
#include <stdio.h>

LIBUNIFIEDLANCOMM_API std::string toString(unsigned char c)
{
	std::string out;
	std::stringstream ss;
	ss << std::dec << (unsigned int)c;
	ss >> out;
	return out;
}

LIBUNIFIEDLANCOMM_API std::string toHexString(const std::string& str)
{
	std::string out;
	std::stringstream ss;
	ss << std::hex << std::setfill('0');
	for(unsigned int i = 0; i < str.size(); i++) {
		ss << std::setw(2) << (((unsigned int)str.at(i)) & 0x000000FF);
	}
	ss >> out;
	return out;
}

LIBUNIFIEDLANCOMM_API std::string hexStringToString(const std::string& hexStr)
{
    std::string out;
    std::stringstream ss;
    ss >> std::hex;
	if (hexStr.size() % 2 == 0)
	{
		for (unsigned int i = 0; i < hexStr.size(); i += 2)
		{
			const char tmp[] = { hexStr.at(i), hexStr.at(i + 1), 0 };
			ss.clear();
			ss.str(tmp);
			int x = 0;
			ss >> x;
			out.append(1, (unsigned char) (x & 0x000000FF));
		}
	}
	return out;
}
