#ifndef _UNIFIEDLANPROTOCOLMESSAGETYPECONVERTER_H_
#define _UNIFIEDLANPROTOCOLMESSAGETYPECONVERTER_H_

#include <string>
#include <DLLImportExportULC.h>

LIBUNIFIEDLANCOMM_API int hexStringToInt(const std::string& hexStr);
LIBUNIFIEDLANCOMM_API unsigned int hexStringToUInt(const std::string& hexStr);
LIBUNIFIEDLANCOMM_API unsigned char hexStringToUChar(const std::string& hexStr);

LIBUNIFIEDLANCOMM_API std::string binaryDataToHexStr(const std::string& binaryData);
LIBUNIFIEDLANCOMM_API std::string intToHexStr(const int i);
LIBUNIFIEDLANCOMM_API std::string ucharToHexStr(const unsigned char uc);

#endif
