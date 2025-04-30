#ifndef _LIBUNIFIEDLANCOMM_DLLIMPORTEXPORT_H_
#define _LIBUNIFIEDLANCOMM_DLLIMPORTEXPORT_H_

#ifdef WIN32
#  ifdef LIBUNIFIEDLANCOMM_BUILD
#    define LIBUNIFIEDLANCOMM_API __declspec(dllexport)
#  else
#    define LIBUNIFIEDLANCOMM_API __declspec(dllimport)
#  endif
#else
#  define LIBUNIFIEDLANCOMM_API 
#endif

#endif