# Makefile for tclrpc extension

ROMFSINST = $(shell if [ -x ../helper_scripts/romfs-inst.sh ]; then echo ../helper_scripts/romfs-inst.sh; else echo /usr/bin/romfs-inst.sh; fi)
STRIP = $(CROSS)strip

TCLRPC = tclrpc.so

TCLPATH = ../tcl
#TCLPATH = ../tcl-8.6.9
TCLVERSION = $(shell awk -F "[ \t]*=[ \t]*" 'NF==2 && $$1 == "VERSION" {print $$2}' $(TCLPATH)/unix/Makefile)
TCLINCLUDEPATH = $(TCLPATH)/generic
TCLLIBPATH = $(TCLPATH)/unix
TCLLIB = -L$(TCLLIBPATH) -ltcl$(TCLVERSION)

XMLRPCPATH = ../xmlrpc
XMLRPCLIB = libXmlRpc.so
#XMLRPCOBJS = $(XMLRPCPATH)/$(XMLRPCLIB)
XMLRPCINCLUDE = $(XMLRPCPATH)/src

TCLRPCOBJS = tclrpc.o

CC = $(CROSS)g++
CXX = $(CROSS)g++
LD = $(CROSS)g++
CXXFLAGS +=  -fPIC -O2 -I$(XMLRPCINCLUDE) -I$(TCLINCLUDEPATH) -W -Wall -Wno-write-strings
LDFLAGS += -shared -fPIC $(TCLLIB) -lstdc++ -L$(XMLRPCPATH) -lXmlRpc

all: xmlrpc $(TCLRPC)

xmlrpc_clean:
	make -C $(XMLRPCPATH) clean
	 
xmlrpc:
	make -C $(XMLRPCPATH) $(XMLRPCLIB)
	 
xmlrpc_install:
	make -C $(XMLRPCPATH) install
	 
$(TCLRPC): $(TCLRPCOBJS) $(XMLRPCOBJS)
	$(LD) -o $(TCLRPC) $(TCLRPCOBJS) $(LDFLAGS)

install: $(TCLRPC)
	$(STRIP) $(TCLRPC)
	$(ROMFSINST) /lib/$(TCLRPC)


clean:
	rm -rf *.o
	rm -rf $(TCLRPC)
