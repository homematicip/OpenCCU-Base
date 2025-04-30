#ifndef _COMMONCONVERSION_H_
#define _COMMONCONVERSION_H_


#include <DLLImportExportULC.h>
#include <string>

LIBUNIFIEDLANCOMM_API std::string toString(unsigned char c);
LIBUNIFIEDLANCOMM_API std::string toHexString(const std::string& str);
LIBUNIFIEDLANCOMM_API std::string hexStringToString(const std::string& hexStr);


#endif
